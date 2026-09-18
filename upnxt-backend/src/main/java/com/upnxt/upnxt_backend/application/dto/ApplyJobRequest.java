package com.upnxt.upnxt_backend.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyJobRequest {

    @NotBlank(message = "Cover letter is required")
    private String coverLetter;

    @NotBlank(message = "Resume URL is required")
    private String resumeUrl;
}