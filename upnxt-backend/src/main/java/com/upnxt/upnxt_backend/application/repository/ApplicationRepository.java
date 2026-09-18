package com.upnxt.upnxt_backend.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upnxt.upnxt_backend.application.entity.Application;
import com.upnxt.upnxt_backend.application.entity.ApplicationStatus;
import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.jobs.entity.Job;
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByCandidate(User candidate);

    List<Application> findByJob(Job job);
    boolean existsByCandidateAndJob(User candidate, Job job);
     long countByJobIn(List<Job> jobs);

    long countByJobInAndStatus(
            List<Job> jobs,
            ApplicationStatus status);
}