package com.busbooking.app.controller;

import com.busbooking.app.dto.ApiResponse;
import com.busbooking.app.dto.BookingResponse;
import com.busbooking.app.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(@RequestBody Map<String, Object> request) {
        Long busId = Long.valueOf(request.get("busId").toString());
        List<Long> seatIds = (List<Long>) request.get("seatIds");
        return ResponseEntity.ok(ApiResponse.success("Booking successful", bookingService.createBooking(busId, seatIds)));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getUserBookings() {
        return ResponseEntity.ok(ApiResponse.success("Bookings retrieved successfully", bookingService.getUserBookings()));
    }
}

