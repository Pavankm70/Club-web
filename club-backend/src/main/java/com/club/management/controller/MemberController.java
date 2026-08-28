package com.club.management.controller;

import com.club.management.dto.MemberRequest;
import com.club.management.dto.MemberResponse;
import com.club.management.dto.RegisterRequest;
import com.club.management.entity.User;
import com.club.management.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<List<MemberResponse>> getAllMembers() {
        List<MemberResponse> members = memberService.getAllMembers().stream()
                .map(MemberResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(members);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> getMemberById(@PathVariable Long id) {
        User user = memberService.getMemberById(id);
        return ResponseEntity.ok(MemberResponse.fromEntity(user));
    }

    @GetMapping("/me")
    public ResponseEntity<MemberResponse> getCurrentMember() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = memberService.getMemberByEmail(email);
        return ResponseEntity.ok(MemberResponse.fromEntity(user));
    }

    @PostMapping
    public ResponseEntity<MemberResponse> createMember(@RequestBody RegisterRequest request) {
        User user = memberService.createMember(request);
        return ResponseEntity.ok(MemberResponse.fromEntity(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MemberResponse> updateMember(@PathVariable Long id, @RequestBody MemberRequest request) {
        User user = memberService.updateMember(id, request);
        return ResponseEntity.ok(MemberResponse.fromEntity(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = memberService.getMemberByEmail(currentEmail);

        if (currentUser.getId().equals(id)) {
            throw new RuntimeException("You cannot delete your own account");
        }

        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
