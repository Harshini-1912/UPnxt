package com.upnxt.upnxt_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.upnxt.upnxt_backend.security.jwt.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            )

            .authorizeHttpRequests(auth -> auth

                // =========================
                // AUTH
                // =========================
                .requestMatchers("/api/auth/**")
                .permitAll()

                // =========================
                // CANDIDATE
                // =========================
                .requestMatchers("/api/applications/apply/**")
                .hasAuthority("ROLE_CANDIDATE")

                .requestMatchers("/api/applications/my")
                .hasAuthority("ROLE_CANDIDATE")

                // =========================
                // RECRUITER
                // =========================
                .requestMatchers("/api/recruiter/**")
                .hasAuthority("ROLE_RECRUITER")

                .requestMatchers(HttpMethod.POST, "/api/jobs")
                .hasAuthority("ROLE_RECRUITER")

                .requestMatchers(HttpMethod.PUT, "/api/jobs/**")
                .hasAuthority("ROLE_RECRUITER")

                .requestMatchers(HttpMethod.DELETE, "/api/jobs/**")
                .hasAuthority("ROLE_RECRUITER")

                // =========================
                // RECRUITER APPLICATIONS
                // =========================
                .requestMatchers("/api/applications/job/**")
                .hasAuthority("ROLE_RECRUITER")

                .requestMatchers("/api/applications/*/status")
                .hasAuthority("ROLE_RECRUITER")

                // =========================
                // JOB VIEWING
                // =========================
                .requestMatchers(HttpMethod.GET, "/api/jobs/**")
                .hasAnyAuthority(
                    "ROLE_CANDIDATE",
                    "ROLE_RECRUITER",
                    "ROLE_ADMIN"
                )

                // =========================
                // EVERYTHING ELSE
                // =========================
                .anyRequest()
                .authenticated()
            )

            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}