package com.busbooking.app.controller;

import com.busbooking.app.dto.*;
import com.busbooking.app.entity.RefreshToken;
import com.busbooking.app.entity.User;
import com.busbooking.app.exception.AppException;
import com.busbooking.app.repository.UserRepository;
import com.busbooking.app.security.JwtUtils;
import com.busbooking.app.service.RefreshTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = User.builder()
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .fullName(signUpRequest.getFullName())
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        return ResponseEntity.ok(ApiResponse.success("User registered successfully!", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(loginRequest.getEmail());
        
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new AppException("User not found"));
        
        // Delete old refresh token if exists and create new one
        refreshTokenService.deleteByUserId(user.getId());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return ResponseEntity.ok(ApiResponse.success("Login successful", JwtResponse.builder()
                .token(jwt)
                .refreshToken(refreshToken.getToken())
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateJwtToken(user.getEmail());
                    return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", new TokenRefreshResponse(token, requestRefreshToken)));
                })
                .orElseThrow(() -> new AppException("Refresh token is not in database!"));
    }
}
