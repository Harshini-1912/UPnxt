package com.upnxt.upnxt_backend.company.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.upnxt.upnxt_backend.company.dto.CompanyRequest;
import com.upnxt.upnxt_backend.company.entity.Company;
import com.upnxt.upnxt_backend.company.service.CompanyService;

@RestController
@RequestMapping("/api/company")
@CrossOrigin("*")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public ResponseEntity<Company> createCompany(
            @RequestBody CompanyRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                companyService.createCompany(
                        authentication.getName(),
                        request
                )
        );
    }

    @GetMapping
    public ResponseEntity<Company> getCompany(
            Authentication authentication) {

        return ResponseEntity.ok(
                companyService.getCompany(
                        authentication.getName()
                )
        );
    }

    @PutMapping
    public ResponseEntity<Company> updateCompany(
            @RequestBody CompanyRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                companyService.updateCompany(
                        authentication.getName(),
                        request
                )
        );
    }
}