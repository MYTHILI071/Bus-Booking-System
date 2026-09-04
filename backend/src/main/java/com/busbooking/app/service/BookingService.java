package com.busbooking.app.service;

import com.busbooking.app.dto.BookingResponse;
import com.busbooking.app.entity.Booking;
import com.busbooking.app.entity.Bus;
import com.busbooking.app.entity.Seat;
import com.busbooking.app.entity.User;
import com.busbooking.app.repository.BookingRepository;
import com.busbooking.app.repository.BusRepository;
import com.busbooking.app.repository.SeatRepository;
import com.busbooking.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BrevoEmailService emailService;

    @Transactional
    public BookingResponse createBooking(Long busId, List<Long> seatIds) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Bus bus = busRepository.findById(busId).orElseThrow(() -> new RuntimeException("Bus not found"));
        List<Seat> seats = seatRepository.findAllById(seatIds);

        double totalAmount = seats.stream().mapToDouble(Seat::getPrice).sum();

        Booking booking = Booking.builder()
                .bookingId(UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .bookingDate(LocalDateTime.now())
                .totalAmount(totalAmount)
                .status("CONFIRMED")
                .user(user)
                .bus(bus)
                .bookedSeats(seats)
                .build();

        // Update seat status
        seats.forEach(seat -> seat.setBooked(true));
        seatRepository.saveAll(seats);

        Booking savedBooking = bookingRepository.save(booking);

        // Send Notification
        String subject = "Booking Confirmation - " + savedBooking.getBookingId();
        String content = String.format("Dear %s,<br><br>Your booking for bus %s from %s to %s is confirmed.<br>Booking ID: %s<br>Total Amount: $%.2f<br><br>Thank you for choosing us!",
                user.getFullName(), bus.getBusName(), bus.getSource(), bus.getDestination(), savedBooking.getBookingId(), totalAmount);
        emailService.sendEmail(user.getEmail(), subject, content);

        return mapToResponse(savedBooking);
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> getUserBookings() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Booking> bookings = bookingRepository.findByUser(user);
        return bookings.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private BookingResponse mapToResponse(Booking booking) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        Bus bus = booking.getBus();
        
        return BookingResponse.builder()
                .id(booking.getId())
                .bookingId(booking.getBookingId())
                .bookingDate(booking.getBookingDate())
                .totalAmount(booking.getTotalAmount())
                .status(booking.getStatus())
                .bus(BookingResponse.BusSummary.builder()
                        .busName(bus.getBusName())
                        .busType(bus.getType())
                        .source(bus.getSource())
                        .destination(bus.getDestination())
                        .departureTime(bus.getDepartureTime().format(formatter))
                        .arrivalTime(bus.getArrivalTime().format(formatter))
                        .build())
                .bookedSeats(booking.getBookedSeats().stream()
                        .map(seat -> new BookingResponse.SeatSummary(seat.getSeatNumber()))
                        .collect(Collectors.toList()))
                .build();
    }
}

