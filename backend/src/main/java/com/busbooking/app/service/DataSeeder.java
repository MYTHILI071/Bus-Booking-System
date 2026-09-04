package com.busbooking.app.service;

import com.busbooking.app.entity.Bus;
import com.busbooking.app.entity.Seat;
import com.busbooking.app.repository.BusRepository;
import com.busbooking.app.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public void run(String... args) throws Exception {
        if (busRepository.count() == 0) {
            List<Bus> buses = new ArrayList<>();
            
            buses.add(Bus.builder()
                    .busName("Intercity Express")
                    .busNumber("IC-101")
                    .type("AC Sleeper")
                    .source("New York")
                    .destination("Washington DC")
                    .departureTime(LocalDateTime.now().plusDays(1).withHour(8).withMinute(0))
                    .arrivalTime(LocalDateTime.now().plusDays(1).withHour(12).withMinute(0))
                    .price(45.0)
                    .totalSeats(20)
                    .build());

            buses.add(Bus.builder()
                    .busName("Highway Runner")
                    .busNumber("HR-505")
                    .type("Non-AC Seater")
                    .source("Los Angeles")
                    .destination("San Francisco")
                    .departureTime(LocalDateTime.now().plusDays(2).withHour(22).withMinute(0))
                    .arrivalTime(LocalDateTime.now().plusDays(3).withHour(6).withMinute(0))
                    .price(30.0)
                    .totalSeats(30)
                    .build());

            List<Bus> savedBuses = busRepository.saveAll(buses);

            for (Bus bus : savedBuses) {
                List<Seat> seats = new ArrayList<>();
                for (int i = 1; i <= bus.getTotalSeats(); i++) {
                    seats.add(Seat.builder()
                            .seatNumber("S" + i)
                            .seatType(i % 2 == 0 ? "Aisle" : "Window")
                            .price(bus.getPrice())
                            .isBooked(false)
                            .bus(bus)
                            .build());
                }
                seatRepository.saveAll(seats);
            }

            System.out.println("Sample buses and seats seeded successfully!");
        }
    }
}
