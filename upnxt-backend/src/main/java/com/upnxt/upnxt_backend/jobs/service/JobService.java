package com.upnxt.upnxt_backend.jobs.service;

import java.time.LocalDateTime;
import java.util.List;
import com.upnxt.upnxt_backend.jobs.entity.JobType;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.auth.repository.UserRepository;
import com.upnxt.upnxt_backend.jobs.dto.CreateJobRequest;
import com.upnxt.upnxt_backend.jobs.entity.Job;
import com.upnxt.upnxt_backend.jobs.entity.JobType;
import com.upnxt.upnxt_backend.jobs.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository,
                      UserRepository userRepository) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public Job createJob(CreateJobRequest request, String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        Job job = Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .description(request.getDescription())
                .salary(request.getSalary())
                .jobType(request.getJobType())
                .experience(request.getExperience())
                .skills(request.getSkills())
                .postedAt(LocalDateTime.now())
                .recruiter(recruiter)
                .build();

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public Job updateJob(Long id, CreateJobRequest request) {

        Job job = getJobById(id);

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setDescription(request.getDescription());
        job.setSalary(request.getSalary());
        job.setJobType(request.getJobType());
        job.setExperience(request.getExperience());
        job.setSkills(request.getSkills());

        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {

        Job job = getJobById(id);

        jobRepository.delete(job);
    }
    public List<Job> searchJobs(
        String keyword,
        String location,
        Double minSalary,
        Double maxSalary,
        Integer experience,
        JobType jobType) {

    return jobRepository.findAll()
            .stream()
            .filter(job ->
                    keyword == null ||
                    keyword.isBlank() ||
                    (job.getTitle() != null &&
                     job.getTitle()
                         .toLowerCase()
                         .contains(keyword.toLowerCase())) ||
                    (job.getSkills() != null &&
                     job.getSkills()
                         .toLowerCase()
                         .contains(keyword.toLowerCase()))
            )
            .filter(job ->
                    location == null ||
                    location.isBlank() ||
                    (job.getLocation() != null &&
                     job.getLocation()
                         .toLowerCase()
                         .contains(location.toLowerCase()))
            )
            .filter(job ->
                    minSalary == null ||
                    (job.getSalary() != null &&
                     job.getSalary() >= minSalary)
            )
            .filter(job ->
                    maxSalary == null ||
                    (job.getSalary() != null &&
                     job.getSalary() <= maxSalary)
            )
            .filter(job ->
                    experience == null ||
                    (job.getExperience() != null &&
                     job.getExperience() <= experience)
            )
            .filter(job ->
                    jobType == null ||
                    job.getJobType() == jobType
            )
            .toList();
}
@GetMapping("/search")
public ResponseEntity<List<Job>> searchJobs(

        @RequestParam(required = false) String keyword,

        @RequestParam(required = false) String location,

        @RequestParam(required = false) Double minSalary,

        @RequestParam(required = false) Double maxSalary,

        @RequestParam(required = false) Integer experience,

        @RequestParam(required = false) JobType jobType) {

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
public List<Job> searchJobs(String keyword) {

    return jobRepository
            .findByTitleContainingIgnoreCaseOrSkillsContainingIgnoreCase(
                    keyword,
                    keyword
            );
}
public List<Job> filterJobs(
        String location,
        Double minSalary,
        Integer maxExperience,
        JobType jobType) {

    List<Job> jobs = jobRepository.findAll();

    return jobs.stream()
            .filter(job ->
                    location == null ||
                    job.getLocation() != null &&
                    job.getLocation()
                        .toLowerCase()
                        .contains(location.toLowerCase()))
            .filter(job ->
                    minSalary == null ||
                    job.getSalary() != null &&
                    job.getSalary() >= minSalary)
            .filter(job ->
                    maxExperience == null ||
                    job.getExperience() != null &&
                    job.getExperience() <= maxExperience)
            .filter(job ->
                    jobType == null ||
                    job.getJobType() == jobType)
            .toList();
}
}