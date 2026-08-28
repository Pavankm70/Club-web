package com.club.management.dto;

import com.club.management.entity.User;
import java.time.LocalDateTime;

public class MemberResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private LocalDateTime createdAt;

    public MemberResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static MemberResponse fromEntity(User user) {
        MemberResponse response = new MemberResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole() != null ? user.getRole().name() : null);
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }
}
