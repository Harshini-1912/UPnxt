package com.upnxt.upnxt_backend.auth.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.upnxt.upnxt_backend.auth.dto.AuthResponse;
import com.upnxt.upnxt_backend.auth.dto.LoginRequest;
import com.upnxt.upnxt_backend.auth.dto.LoginResponse;
import com.upnxt.upnxt_backend.auth.dto.RegisterRequest;
import com.upnxt.upnxt_backend.auth.entity.User;
import com.upnxt.upnxt_backend.auth.repository.UserRepository;
import com.upnxt.upnxt_backend.security.jwt.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                   PasswordEncoder passwordEncoder,
                   JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already exists");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            return new AuthResponse(false, "Phone number already exists");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(request.getRole())
                .build();

        userRepository.save(user);

        return new AuthResponse(true, "User Registered Successfully");
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new LoginResponse(
                    false,
                    "User not found",
                    null,
                    null,
                    null
            );
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(
                    false,
                    "Invalid Password",
                    null,
                    null,
                    null
            );
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(
                true,
                "Login Successful",
                token,
                user.getEmail(),
                user.getRole().name()
        );
    }
}