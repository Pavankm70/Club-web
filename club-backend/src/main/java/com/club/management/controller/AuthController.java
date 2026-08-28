package com.club.management.controller;

import com.club.management.dto.AuthResponse;
import com.club.management.dto.LoginRequest;
import com.club.management.dto.MemberResponse;
import com.club.management.dto.RegisterRequest;
import com.club.management.entity.User;
import com.club.management.security.JwtUtil;
import com.club.management.service.MemberService;
import com.club.management.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final MemberService memberService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                          UserService userService, MemberService memberService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = memberService.getMemberByEmail(request.getEmail());
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getRole().name(), user.getName()));
    }

    @PostMapping("/register-admin")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody RegisterRequest request) {
        User user = userService.registerAdmin(request);
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getRole().name(), user.getName()));
    }

    @PostMapping("/register-member")
    public ResponseEntity<MemberResponse> registerMember(@RequestBody RegisterRequest request) {
        User user = memberService.createMember(request);
        return ResponseEntity.ok(MemberResponse.fromEntity(user));
    }
}
