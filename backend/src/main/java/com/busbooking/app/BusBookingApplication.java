package com.busbooking.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BusBookingApplication {
    public static void main(String[] args) {
        System.setProperty("spring.profiles.active", "default");
        SpringApplication.run(BusBookingApplication.class, args);
    }
}
