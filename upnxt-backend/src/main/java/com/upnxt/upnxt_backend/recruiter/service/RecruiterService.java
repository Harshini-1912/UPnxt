package com.upnxt.upnxt_backend.recruiter.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.upnxt.upnxt_backend.application.entity.ApplicationStatus;
import com.upnxt.upnxt_backend.application.repository.ApplicationRepository;
import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.auth.repository.UserRepository;
import com.upnxt.upnxt_backend.jobs.entity.Job;
import com.upnxt.upnxt_backend.jobs.repository.JobRepository;
import com.upnxt.upnxt_backend.recruiter.dto.RecruiterDashboardResponse;

@Service
public class RecruiterService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    public RecruiterService(
            JobRepository jobRepository,
            UserRepository userRepository,
            ApplicationRepository applicationRepository) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
    }

    public List<Job> getMyJobs(String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        return jobRepository.findByRecruiter(recruiter);
    }

    public RecruiterDashboardResponse getDashboard(String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        List<Job> jobs = jobRepository.findByRecruiter(recruiter);

        long totalJobs = jobs.size();

        long totalApplicants =
                applicationRepository.countByJobIn(jobs);

        long pendingApplications =
                applicationRepository.countByJobInAndStatus(
                        jobs,
                        ApplicationStatus.PENDING);

        long shortlistedApplications =
                applicationRepository.countByJobInAndStatus(
                        jobs,
                        ApplicationStatus.SHORTLISTED);

        long rejectedApplications =
                applicationRepository.countByJobInAndStatus(
                        jobs,
                        ApplicationStatus.REJECTED);

        return RecruiterDashboardResponse.builder()
                .totalJobs(totalJobs)
                .totalApplicants(totalApplicants)
                .pendingApplications(pendingApplications)
                .shortlistedApplications(shortlistedApplications)
                .rejectedApplications(rejectedApplications)
                .build();
    }
}