package com.busbooking.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seats")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber;
    private String seatType; // Window, Aisle
    private Double price;
    private boolean isBooked;

    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;
}
