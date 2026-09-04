package com.busbooking.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private String bookingId;
    private LocalDateTime bookingDate;
    private Double totalAmount;
    private String status;
    private BusSummary bus;
    private List<SeatSummary> bookedSeats;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class BusSummary {
        private String busName;
        private String busType;
        private String source;
        private String destination;
        private String departureTime;
        private String arrivalTime;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class SeatSummary {
        private String seatNumber;
    }
}
