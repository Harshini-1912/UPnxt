package com.upnxt.upnxt_backend.company.dto;

import lombok.Data;

@Data
public class CompanyRequest {

    private String companyName;

    private String industry;

    private String location;

    private String description;

    private String website;

    private String companySize;

    private String logoUrl;
}