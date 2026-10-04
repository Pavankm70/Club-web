package com.club.management.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class GoogleSheetsService {

    private static final String TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets/";
    private static final String SCOPE = "https://www.googleapis.com/auth/spreadsheets";
    private static final String TIMESTAMP_FORMAT = "dd MMM yyyy, HH:mm:ss";

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${google.sheets.spreadsheet-id:}")
    private String spreadsheetId;

    @Value("${google.sheets.range:Sheet1!A1}")
    private String range;

    @Value("${google.sheets.credentials-json:}")
    private String credentialsJson;

    @Value("${google.sheets.credentials-file:}")
    private String credentialsFile;

    private String cachedAccessToken;
    private Instant tokenExpiry = Instant.EPOCH;

    public boolean isConfigured() {
        return spreadsheetId != null && !spreadsheetId.isBlank()
                && ((credentialsJson != null && !credentialsJson.isBlank())
                    || (credentialsFile != null && !credentialsFile.isBlank()));
    }

    public void appendRow(List<String> cells) {
        if (!isConfigured()) {
            throw new IllegalStateException(
                    "Registration is not available yet: Google Sheets is not configured on the server.");
        }

        String token = accessToken();

        ObjectNode payload = objectMapper.createObjectNode();
        ArrayNode values = payload.putArray("values");
        ArrayNode row = values.addArray();
        cells.forEach(row::add);

        String url = SHEETS_API + spreadsheetId + "/values/" + encode(range) + ":append"
                + "?valueInputOption=RAW&insertDataOption=INSERT_ROWS";

        HttpRequest request = HttpRequest.newBuilder(URI.create(url))
                .header("Authorization", "Bearer " + token)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload.toString()))
                .build();

        HttpResponse<String> response = send(request);

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IllegalStateException("Could not save the registration: " + extractError(response.body()));
        }
    }

    public String now() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(TIMESTAMP_FORMAT));
    }

    private synchronized String accessToken() {
        if (cachedAccessToken != null && Instant.now().isBefore(tokenExpiry.minusSeconds(60))) {
            return cachedAccessToken;
        }

        try {
            JsonNode credentials = objectMapper.readTree(readCredentials());
            String clientEmail = credentials.path("client_email").asText(null);
            String privateKeyPem = credentials.path("private_key").asText(null);

            if (clientEmail == null || clientEmail.isBlank()
                    || privateKeyPem == null || privateKeyPem.isBlank()) {
                throw new IllegalStateException(
                        "Service account JSON must contain 'client_email' and 'private_key'.");
            }

            String assertion = buildAssertion(clientEmail, privateKeyPem);
            String form = "grant_type="
                    + encode("urn:ietf:params:oauth:grant-type:jwt-bearer")
                    + "&assertion=" + encode(assertion);

            HttpRequest request = HttpRequest.newBuilder(URI.create(TOKEN_URL))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(form))
                    .build();

            HttpResponse<String> response = send(request);
            if (response.statusCode() != 200) {
                throw new IllegalStateException("Google sign-in failed: " + extractError(response.body()));
            }

            JsonNode token = objectMapper.readTree(response.body());
            cachedAccessToken = token.path("access_token").asText(null);
            if (cachedAccessToken == null) {
                throw new IllegalStateException("Google sign-in failed: no access token returned.");
            }
            tokenExpiry = Instant.now().plusSeconds(token.path("expires_in").asLong(3600));
            return cachedAccessToken;
        } catch (IOException e) {
            throw new IllegalStateException("Google sign-in failed: " + e.getMessage(), e);
        } catch (java.security.GeneralSecurityException e) {
            throw new IllegalStateException("Invalid service account private key: " + e.getMessage(), e);
        }
    }

    private String buildAssertion(String clientEmail, String privateKeyPem)
            throws java.security.GeneralSecurityException, IOException {

        long now = Instant.now().getEpochSecond();

        String header = base64Url(objectMapper.writeValueAsBytes(Map.of("alg", "RS256", "typ", "JWT")));

        Map<String, Object> claims = new LinkedHashMap<>();
        claims.put("iss", clientEmail);
        claims.put("scope", SCOPE);
        claims.put("aud", TOKEN_URL);
        claims.put("iat", now);
        claims.put("exp", now + 3600);
        String payload = base64Url(objectMapper.writeValueAsBytes(claims));

        String signingInput = header + "." + payload;

        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(privateKey(privateKeyPem));
        signature.update(signingInput.getBytes(StandardCharsets.UTF_8));

        return signingInput + "." + Base64.getUrlEncoder().withoutPadding().encodeToString(signature.sign());
    }

    private PrivateKey privateKey(String privateKeyPem) throws java.security.GeneralSecurityException {
        String base64 = privateKeyPem
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s", "");
        byte[] encoded = Base64.getDecoder().decode(base64);
        return KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(encoded));
    }

    private String readCredentials() throws IOException {
        if (credentialsJson != null && !credentialsJson.isBlank()) {
            return credentialsJson;
        }
        return Files.readString(Path.of(credentialsFile.trim()), StandardCharsets.UTF_8);
    }

    private HttpResponse<String> send(HttpRequest request) {
        try {
            return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            throw new IllegalStateException("Could not reach Google: " + e.getMessage(), e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Request to Google was interrupted.", e);
        }
    }

    private String extractError(String body) {
        if (body == null || body.isBlank()) {
            return "no response from Google";
        }
        try {
            JsonNode error = objectMapper.readTree(body).path("error");
            String message = error.path("message").asText(null);
            if (message != null && !message.isBlank()) {
                return message;
            }
        } catch (IOException ignored) {
        }
        return body;
    }

    private String base64Url(byte[] value) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(value);
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8).replace("+", "%20");
    }
}