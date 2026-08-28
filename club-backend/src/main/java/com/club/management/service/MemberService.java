package com.club.management.service;

import com.club.management.dto.MemberRequest;
import com.club.management.dto.RegisterRequest;
import com.club.management.entity.Role;
import com.club.management.entity.User;
import com.club.management.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllMembers() {
        return userRepository.findAll();
    }

    public User getMemberById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    public User createMember(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPhone(req.getPhone());
        user.setRole(Role.valueOf(req.getRole().toUpperCase()));
        return userRepository.save(user);
    }

    public User updateMember(Long id, MemberRequest req) {
        User user = getMemberById(id);
        if (req.getName() != null) user.setName(req.getName());
        if (req.getEmail() != null) user.setEmail(req.getEmail());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getRole() != null) user.setRole(Role.valueOf(req.getRole().toUpperCase()));
        if (req.getPassword() != null && !req.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(req.getPassword()));
        }
        return userRepository.save(user);
    }

    public void deleteMember(Long id) {
        User user = getMemberById(id);
        userRepository.delete(user);
    }

    public User getMemberByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Member not found with email: " + email));
    }

    public List<User> getMembersByRole(Role role) {
        return userRepository.findAllByRole(role);
    }
}
