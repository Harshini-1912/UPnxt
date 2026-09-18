package com.upnxt.upnxt_backend.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.upnxt.upnxt_backend.auth.dto.AuthResponse;
import com.upnxt.upnxt_backend.auth.dto.LoginRequest;
import com.upnxt.upnxt_backend.auth.dto.LoginResponse;
import com.upnxt.upnxt_backend.auth.dto.RegisterRequest;
import com.upnxt.upnxt_backend.auth.service.AuthService;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

        return ResponseEntity.ok(authService.register(request));

    }
    @PostMapping("/login")
public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

    System.out.println("LOGIN API HIT");

    return ResponseEntity.ok(authService.login(request));
}
}
