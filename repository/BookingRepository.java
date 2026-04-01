package com.busbooking.app.repository;

import com.busbooking.app.entity.Booking;
import com.busbooking.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    java.util.Optional<Booking> findByIdAndUser(Long id, User user);
}
