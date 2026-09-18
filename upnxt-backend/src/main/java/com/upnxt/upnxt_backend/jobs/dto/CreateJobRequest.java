package com.upnxt.upnxt_backend.jobs.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateJobRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Job description is required")
    private String description;

    @NotBlank(message = "Salary is required")
    private String salary;

    @NotBlank(message = "Job type is required")
    private String jobType;

    @NotBlank(message = "Experience is required")
    private String experience;

    @NotBlank(message = "Skills are required")
    private String skills;
}