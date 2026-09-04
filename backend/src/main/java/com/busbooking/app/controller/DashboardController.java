package com.busbooking.app.controller;

import com.busbooking.app.dto.ApiResponse;
import com.busbooking.app.entity.Bus;
import com.busbooking.app.entity.User;
import com.busbooking.app.repository.UserRepository;
import com.busbooking.app.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusService busService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Bus>>> searchBuses(@RequestParam String source, @RequestParam String destination) {
        List<Bus> buses = busService.searchBuses(source, destination);
        return ResponseEntity.ok(ApiResponse.success("Search results retrieved successfully", buses));
    }
}
