package com.upnxt.upnxt_backend.candidate.service;

import org.springframework.stereotype.Service;

import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.auth.repository.UserRepository;
import com.upnxt.upnxt_backend.candidate.dto.UpdateCandidateProfileRequest;

@Service
public class CandidateService {

    private final UserRepository userRepository;

    public CandidateService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getProfile(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));
    }

    public User updateProfile(
            String email,
            UpdateCandidateProfileRequest request) {

        User candidate = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));

        if (request.getFirstName() != null) {
            candidate.setFirstName(request.getFirstName());
        }

        if (request.getLastName() != null) {
            candidate.setLastName(request.getLastName());
        }

        if (request.getPhone() != null) {
            candidate.setPhone(request.getPhone());
        }

        if (request.getLocation() != null) {
            candidate.setLocation(request.getLocation());
        }

        if (request.getSkills() != null) {
            candidate.setSkills(request.getSkills());
        }

        if (request.getBio() != null) {
            candidate.setBio(request.getBio());
        }

        if (request.getResumeUrl() != null) {
            candidate.setResumeUrl(request.getResumeUrl());
        }

        if (request.getProfileImage() != null) {
            candidate.setProfileImage(request.getProfileImage());
        }

        return userRepository.save(candidate);
    }
}