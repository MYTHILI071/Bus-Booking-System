package com.busbooking.app.controller;

import com.busbooking.app.dto.ApiResponse;
import com.busbooking.app.entity.Seat;
import com.busbooking.app.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/seats")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @GetMapping("/{busId}")
    public ResponseEntity<ApiResponse<List<Seat>>> getSeatsByBusId(@PathVariable Long busId) {
        return ResponseEntity.ok(ApiResponse.success("Seats retrieved successfully", seatService.getSeatsByBusId(busId)));
    }

    @PostMapping("/select")
    public ResponseEntity<ApiResponse<Seat>> selectSeat(@RequestParam Long seatId) {
        Seat seat = seatService.updateSeatBookingStatus(seatId, true);
        return ResponseEntity.ok(ApiResponse.success("Seat selected successfully", seat));
    }
}
