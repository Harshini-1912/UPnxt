package com.upnxt.upnxt_backend.application.entity;

import java.time.LocalDateTime;

import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.jobs.entity.Job;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "candidate_id")
@JsonIgnore
private User candidate;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "job_id")
@JsonIgnore
private Job job;
    

    @Column(length = 3000)
    private String coverLetter;

    private String resumeUrl;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    private LocalDateTime appliedAt;
}