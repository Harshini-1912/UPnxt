package com.upnxt.upnxt_backend.recruiter.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.upnxt.upnxt_backend.jobs.entity.Job;
import com.upnxt.upnxt_backend.recruiter.dto.RecruiterDashboardResponse;
import com.upnxt.upnxt_backend.recruiter.service.RecruiterService;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin("*")
public class RecruiterController {

    private final RecruiterService recruiterService;

    public RecruiterController(RecruiterService recruiterService) {
        this.recruiterService = recruiterService;
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getMyJobs(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                recruiterService.getMyJobs(email)
        );
    }

    @GetMapping("/dashboard")
    public ResponseEntity<RecruiterDashboardResponse> getDashboard(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                recruiterService.getDashboard(email)
        );
    }
}