package com.club.management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegistrationRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be under 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 120, message = "Email must be under 120 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phone;

    @NotBlank(message = "Year is required")
    @Size(max = 40, message = "Year must be under 40 characters")
    private String year;

    @NotBlank(message = "Branch is required")
    @Size(max = 80, message = "Branch must be under 80 characters")
    private String branch;

    @NotBlank(message = "Roll number is required")
    @Size(max = 40, message = "Roll number must be under 40 characters")
    private String rollNo;

    @Size(max = 120, message = "GitHub link must be under 120 characters")
    @Pattern(regexp = "^$|^[A-Za-z0-9._~:/?#\\[\\]@!$&'()*+,;=%-]+$",
            message = "Enter a valid GitHub link")
    private String github;

    @NotBlank(message = "Tell us why you want to join")
    @Size(max = 1000, message = "Answer must be under 1000 characters")
    private String whyJoin;

    public RegistrationRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public String getWhyJoin() { return whyJoin; }
    public void setWhyJoin(String whyJoin) { this.whyJoin = whyJoin; }
}