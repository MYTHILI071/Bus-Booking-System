package com.busbooking.app.repository;

import com.busbooking.app.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface BusRepository extends JpaRepository<Bus, Long> {
    @Query("SELECT b FROM Bus b WHERE b.source LIKE %:source% AND b.destination LIKE %:destination%")
    List<Bus> searchBuses(String source, String destination);
}
