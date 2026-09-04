package com.busbooking.app.controller;

import com.busbooking.app.dto.ApiResponse;
import com.busbooking.app.entity.Bus;
import com.busbooking.app.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/buses")
public class BusController {
    @Autowired
    private BusService busService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Bus>>> getAllBuses() {
        return ResponseEntity.ok(ApiResponse.success("Buses retrieved successfully", busService.getAllBuses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Bus>> getBusById(@PathVariable Long id) {
        return busService.getBusById(id)
                .map(bus -> ResponseEntity.ok(ApiResponse.success("Bus retrieved successfully", bus)))
                .orElse(ResponseEntity.notFound().build());
    }
}
