package com.upnxt.upnxt_backend.jobs.entity;

import java.time.LocalDateTime;

import com.upnxt.upnxt_backend.auth.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String company;

    private String location;

    @Column(length = 5000)
    private String description;

    private Double salary;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    private Integer experience;

    private String skills;

    private LocalDateTime postedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruiter_id")
    @JsonIgnore
    private User recruiter;
}