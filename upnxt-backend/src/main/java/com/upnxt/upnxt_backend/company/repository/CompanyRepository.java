package com.upnxt.upnxt_backend.company.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.company.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findByRecruiter(User recruiter);
}