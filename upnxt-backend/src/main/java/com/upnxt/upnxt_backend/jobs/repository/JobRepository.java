package com.upnxt.upnxt_backend.jobs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.jobs.entity.Job;
import com.upnxt.upnxt_backend.jobs.entity.JobType;
import com.upnxt.upnxt_backend.jobs.entity.JobType;
@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByRecruiter(User recruiter);

    List<Job> findByTitleContainingIgnoreCaseOrSkillsContainingIgnoreCase(
            String title,
            String skills
    );
    List<Job> findByLocationContainingIgnoreCase(String location);

List<Job> findBySalaryGreaterThanEqual(Double salary);

List<Job> findByExperienceLessThanEqual(Integer experience);

List<Job> findByJobType(JobType jobType);
}