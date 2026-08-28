package com.club.management;

import com.club.management.entity.Role;
import com.club.management.entity.User;
import com.club.management.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ClubManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClubManagementApplication.class, args);
    }

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = System.getenv().getOrDefault("ADMIN_EMAIL", System.getProperty("admin.email", "admin@clubhub.org"));
            String adminPassword = System.getenv().getOrDefault("ADMIN_PASSWORD", System.getProperty("admin.password", "Admin@2026#Xy7"));

            boolean adminExists = userRepository.findAllByRole(Role.ADMIN).stream().findFirst().isPresent();
            if (!adminExists && !adminEmail.isBlank() && !adminPassword.isBlank()) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setPhone("0000000000");
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
                System.out.println("Admin created from environment/system properties.");
            }

            if (userRepository.count() <= 1) {
                System.out.println("Adding sample members...");

                createMember(userRepository, passwordEncoder,
                        "Rahul Sharma", "rahul@club.com", "9876543210", "rahul123", Role.MEMBER);
                createMember(userRepository, passwordEncoder,
                        "Priya Patel", "priya@club.com", "9876543211", "priya123", Role.MEMBER);
                createMember(userRepository, passwordEncoder,
                        "Amit Kumar", "amit@club.com", "9876543212", "amit123", Role.MEMBER);
                createMember(userRepository, passwordEncoder,
                        "Sneha Reddy", "sneha@club.com", "9876543213", "sneha123", Role.MEMBER);
                createMember(userRepository, passwordEncoder,
                        "Vikram Singh", "vikram@club.com", "9876543214", "vikram123", Role.MEMBER);
                createMember(userRepository, passwordEncoder,
                        "Ananya Iyer", "ananya@club.com", "9876543215", "ananya123", Role.MEMBER);
                createMember(userRepository, passwordEncoder,
                        "Deepak Verma", "deepak@club.com", "9876543216", "deepak123", Role.MEMBER);
                createMember(userRepository, passwordEncoder,
                        "Neha Gupta", "neha@club.com", "9876543217", "neha123", Role.MEMBER);

                System.out.println("8 sample members added successfully!");
                System.out.println("Member login example: rahul@club.com / rahul123");
            }
        };
    }

    private void createMember(UserRepository repo, PasswordEncoder encoder,
                              String name, String email, String phone, String password, Role role) {
        if (repo.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPhone(phone);
            user.setPassword(encoder.encode(password));
            user.setRole(role);
            repo.save(user);
        }
    }
}
