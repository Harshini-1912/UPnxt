package com.upnxt.upnxt_backend.candidate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.candidate.dto.UpdateCandidateProfileRequest;
import com.upnxt.upnxt_backend.candidate.service.CandidateService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/candidate")
@CrossOrigin("*")
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(
            Authentication authentication) {

        return ResponseEntity.ok(
                candidateService.getProfile(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateCandidateProfileRequest request) {

        return ResponseEntity.ok(
                candidateService.updateProfile(
                        authentication.getName(),
                        request
                )
        );
    }
}