package com.club.management.controller;

import com.club.management.dto.RegistrationRequest;
import com.club.management.service.GoogleSheetsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final GoogleSheetsService googleSheetsService;

    public RegistrationController(GoogleSheetsService googleSheetsService) {
        this.googleSheetsService = googleSheetsService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegistrationRequest request) {
        googleSheetsService.appendRow(List.of(
                googleSheetsService.now(),
                request.getName().trim(),
                request.getEmail().trim(),
                request.getPhone().trim(),
                request.getYear().trim(),
                request.getBranch().trim(),
                request.getRollNo().trim(),
                request.getGithub() == null ? "" : request.getGithub().trim(),
                request.getWhyJoin().trim()
        ));

        return ResponseEntity.ok(Map.of(
                "message", "Registration received. We will get back to you soon."
        ));
    }
}