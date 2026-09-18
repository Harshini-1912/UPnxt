package com.upnxt.upnxt_backend.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.upnxt.upnxt_backend.application.dto.ApplyJobRequest;
import com.upnxt.upnxt_backend.application.dto.UpdateApplicationStatusRequest;
import com.upnxt.upnxt_backend.application.entity.Application;
import com.upnxt.upnxt_backend.application.service.ApplicationService;
import java.util.List;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/apply/{jobId}")
    public ResponseEntity<Application> applyJob(
            @PathVariable Long jobId,
@Valid @RequestBody ApplyJobRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                applicationService.applyJob(jobId, email, request)
        );
    }

    @GetMapping("/my")
    public ResponseEntity<List<Application>> getMyApplications(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                applicationService.getMyApplications(email)
        );
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicants(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                applicationService.getApplicants(jobId)
        );
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable Long applicationId,
            @RequestBody UpdateApplicationStatusRequest request) {

        return ResponseEntity.ok(
                applicationService.updateStatus(applicationId, request)
        );
    }
}
    