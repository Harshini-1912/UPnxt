package com.upnxt.upnxt_backend.company.service;

import org.springframework.stereotype.Service;

import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.auth.repository.UserRepository;
import com.upnxt.upnxt_backend.company.dto.CompanyRequest;
import com.upnxt.upnxt_backend.company.entity.Company;
import com.upnxt.upnxt_backend.company.repository.CompanyRepository;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public CompanyService(
            CompanyRepository companyRepository,
            UserRepository userRepository) {

        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    public Company createCompany(
            String email,
            CompanyRequest request) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        if (companyRepository.findByRecruiter(recruiter).isPresent()) {
            throw new RuntimeException(
                    "Company profile already exists");
        }

        Company company = Company.builder()
                .companyName(request.getCompanyName())
                .industry(request.getIndustry())
                .location(request.getLocation())
                .description(request.getDescription())
                .website(request.getWebsite())
                .companySize(request.getCompanySize())
                .logoUrl(request.getLogoUrl())
                .recruiter(recruiter)
                .build();

        return companyRepository.save(company);
    }

    public Company getCompany(String email) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        return companyRepository.findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company profile not found"));
    }

    public Company updateCompany(
            String email,
            CompanyRequest request) {

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Company company = companyRepository.findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company profile not found"));

        company.setCompanyName(request.getCompanyName());
        company.setIndustry(request.getIndustry());
        company.setLocation(request.getLocation());
        company.setDescription(request.getDescription());
        company.setWebsite(request.getWebsite());
        company.setCompanySize(request.getCompanySize());
        company.setLogoUrl(request.getLogoUrl());

        return companyRepository.save(company);
    }
}