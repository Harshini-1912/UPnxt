package com.upnxt.upnxt_backend.company.entity;

import com.upnxt.upnxt_backend.auth.entity.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String companyName;

    private String industry;

    private String location;

    @Column(length = 2000)
    private String description;

    private String website;

    private String companySize;

    private String logoUrl;

    @OneToOne
    @JoinColumn(name = "recruiter_id", unique = true)
    private User recruiter;
}