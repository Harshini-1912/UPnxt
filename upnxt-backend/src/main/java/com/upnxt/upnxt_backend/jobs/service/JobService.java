package com.upnxt.upnxt_backend.jobs.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

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

    public JobService(
            JobRepository jobRepository,
            UserRepository userRepository) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // CREATE JOB
    // =========================
    public Job createJob(
            CreateJobRequest request,
            String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Job job = Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .description(request.getDescription())
                .salary(parseSalary(request.getSalary()))
                .jobType(parseJobType(request.getJobType()))
                .experience(parseExperience(request.getExperience()))
                .skills(request.getSkills())
                .postedAt(LocalDateTime.now())
                .recruiter(recruiter)
                .build();

        return jobRepository.save(job);
    }

    // =========================
    // GET ALL JOBS
    // =========================
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // =========================
    // GET JOB BY ID
    // =========================
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));
    }

    // =========================
    // UPDATE JOB
    // =========================
    public Job updateJob(
            Long id,
            CreateJobRequest request) {

        Job job = getJobById(id);

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setDescription(request.getDescription());
        job.setSalary(parseSalary(request.getSalary()));
        job.setJobType(parseJobType(request.getJobType()));
        job.setExperience(parseExperience(request.getExperience()));
        job.setSkills(request.getSkills());

        return jobRepository.save(job);
    }

    // =========================
    // DELETE JOB
    // =========================
    public void deleteJob(Long id) {

        Job job = getJobById(id);

        jobRepository.delete(job);
    }

    // =========================
    // SEARCH JOBS
    // =========================
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
                        containsIgnoreCase(
                                job.getTitle(),
                                keyword) ||
                        containsIgnoreCase(
                                job.getSkills(),
                                keyword))

                .filter(job ->
                        location == null ||
                        location.isBlank() ||
                        containsIgnoreCase(
                                job.getLocation(),
                                location))

                .filter(job ->
                        minSalary == null ||
                        (job.getSalary() != null &&
                                job.getSalary() >= minSalary))

                .filter(job ->
                        maxSalary == null ||
                        (job.getSalary() != null &&
                                job.getSalary() <= maxSalary))

                .filter(job ->
                        experience == null ||
                        (job.getExperience() != null &&
                                job.getExperience() <= experience))

                .filter(job ->
                        jobType == null ||
                        job.getJobType() == jobType)

                .toList();
    }

    // =========================
    // SIMPLE KEYWORD SEARCH
    // =========================
    public List<Job> searchJobs(String keyword) {

        if (keyword == null || keyword.isBlank()) {
            return jobRepository.findAll();
        }

        return jobRepository
                .findByTitleContainingIgnoreCaseOrSkillsContainingIgnoreCase(
                        keyword,
                        keyword);
    }

    // =========================
    // FILTER JOBS
    // =========================
    public List<Job> filterJobs(
            String location,
            Double minSalary,
            Integer maxExperience,
            JobType jobType) {

        return jobRepository.findAll()
                .stream()

                .filter(job ->
                        location == null ||
                        location.isBlank() ||
                        containsIgnoreCase(
                                job.getLocation(),
                                location))

                .filter(job ->
                        minSalary == null ||
                        (job.getSalary() != null &&
                                job.getSalary() >= minSalary))

                .filter(job ->
                        maxExperience == null ||
                        (job.getExperience() != null &&
                                job.getExperience() <= maxExperience))

                .filter(job ->
                        jobType == null ||
                        job.getJobType() == jobType)

                .toList();
    }

    // =========================
    // HELPERS
    // =========================
    private boolean containsIgnoreCase(
            String value,
            String search) {

        return value != null &&
                value.toLowerCase()
                        .contains(search.toLowerCase());
    }

    private Double parseSalary(String salary) {

        if (salary == null || salary.isBlank()) {
            return null;
        }

        try {
            String cleaned = salary
                    .replace("₹", "")
                    .replace(",", "")
                    .trim();

            return Double.parseDouble(cleaned);

        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException(
                    "Salary must be a valid number");
        }
    }

    private Integer parseExperience(String experience) {

        if (experience == null || experience.isBlank()) {
            return null;
        }

        try {
            String cleaned = experience
                    .replaceAll("[^0-9]", "")
                    .trim();

            if (cleaned.isEmpty()) {
                throw new NumberFormatException();
            }

            return Integer.parseInt(cleaned);

        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException(
                    "Experience must contain a valid number");
        }
    }

    private JobType parseJobType(String jobType) {

        if (jobType == null || jobType.isBlank()) {
            return null;
        }

        try {
            return JobType.valueOf(
                    jobType.trim().toUpperCase());

        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException(
                    "Invalid job type: " + jobType);
        }
    }
}