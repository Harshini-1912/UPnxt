package com.upnxt.upnxt_backend.jobs.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.upnxt.upnxt_backend.jobs.dto.CreateJobRequest;
import com.upnxt.upnxt_backend.jobs.entity.Job;
import com.upnxt.upnxt_backend.jobs.entity.JobType;
import com.upnxt.upnxt_backend.jobs.service.JobService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // =========================
    // CREATE JOB
    // =========================
    @PostMapping
    public ResponseEntity<Job> createJob(
            @Valid @RequestBody CreateJobRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                jobService.createJob(request, email)
        );
    }

    // =========================
    // GET ALL JOBS
    // =========================
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {

        return ResponseEntity.ok(
                jobService.getAllJobs()
        );
    }

    // =========================
    // SEARCH / FILTER JOBS
    // =========================
    @GetMapping("/search")
    public ResponseEntity<List<Job>> searchJobs(

            @RequestParam(required = false)
            String keyword,

            @RequestParam(required = false)
            String location,

            @RequestParam(required = false)
            Double minSalary,

            @RequestParam(required = false)
            Double maxSalary,

            @RequestParam(required = false)
            Integer experience,

            @RequestParam(required = false)
            JobType jobType) {

        return ResponseEntity.ok(
                jobService.searchJobs(
                        keyword,
                        location,
                        minSalary,
                        maxSalary,
                        experience,
                        jobType
                )
        );
    }

    // =========================
    // GET JOB BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobService.getJobById(id)
        );
    }

    // =========================
    // UPDATE JOB
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody CreateJobRequest request) {

        return ResponseEntity.ok(
                jobService.updateJob(id, request)
        );
    }

    // =========================
    // DELETE JOB
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok(
                "Job Deleted Successfully"
        );
    }
}