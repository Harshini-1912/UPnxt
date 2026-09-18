package com.upnxt.upnxt_backend.application.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.upnxt.upnxt_backend.application.dto.ApplyJobRequest;
import com.upnxt.upnxt_backend.application.dto.UpdateApplicationStatusRequest;
import com.upnxt.upnxt_backend.application.entity.Application;
import com.upnxt.upnxt_backend.application.entity.ApplicationStatus;
import com.upnxt.upnxt_backend.application.repository.ApplicationRepository;
import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.auth.repository.UserRepository;
import com.upnxt.upnxt_backend.jobs.entity.Job;
import com.upnxt.upnxt_backend.jobs.repository.JobRepository;
import java.util.List;
import com.upnxt.upnxt_backend.application.dto.UpdateApplicationStatusRequest;
@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public Application applyJob(
        Long jobId,
        String email,
        ApplyJobRequest request) {

    System.out.println("========== APPLY SERVICE ==========");

    System.out.println("JobId = " + jobId);
    System.out.println("Email = " + email);

    User candidate = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Candidate not found"));

    System.out.println("Candidate Found = " + candidate.getEmail());

    Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

    System.out.println("Job Found = " + job.getTitle());

    boolean exists =
            applicationRepository.existsByCandidateAndJob(candidate, job);

    System.out.println("Already Applied = " + exists);

    if (exists) {
        throw new RuntimeException("Already Applied");
    }

    Application application = Application.builder()
            .candidate(candidate)
            .job(job)
            .coverLetter(request.getCoverLetter())
            .resumeUrl(request.getResumeUrl())
            .status(ApplicationStatus.PENDING)
            .appliedAt(LocalDateTime.now())
            .build();

    System.out.println("Saving Application...");

    Application saved = applicationRepository.save(application);

    System.out.println("Saved Successfully");

    return saved;
}
    public List<Application> getMyApplications(String email) {

    User candidate = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Candidate not found"));

    return applicationRepository.findByCandidate(candidate);
}
public List<Application> getApplicants(Long jobId) {

    Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

    return applicationRepository.findByJob(job);
}
public Application updateStatus(
        Long applicationId,
        UpdateApplicationStatusRequest request) {

    Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));

    application.setStatus(request.getStatus());

    return applicationRepository.save(application);
}
}