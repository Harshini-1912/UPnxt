package com.upnxt.upnxt_backend.recruiter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterDashboardResponse {

    private Long totalJobs;

    private Long totalApplicants;

    private Long pendingApplications;

    private Long shortlistedApplications;

    private Long rejectedApplications;
}