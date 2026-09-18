package com.upnxt.upnxt_backend.candidate.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateCandidateProfileRequest {

    private String firstName;

    private String lastName;

    private String phone;

    private String location;

    private String skills;

    @Size(max = 1000)
    private String bio;

    private String resumeUrl;

    private String profileImage;
}