package com.busbooking.app.service;

import com.busbooking.app.entity.Seat;
import com.busbooking.app.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getSeatsByBusId(Long busId) {
        return seatRepository.findByBusId(busId);
    }

    public Seat updateSeatBookingStatus(Long seatId, boolean isBooked) {
        Seat seat = seatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("Seat not found"));
        seat.setBooked(isBooked);
        return seatRepository.save(seat);
    }
}
