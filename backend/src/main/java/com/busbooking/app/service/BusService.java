package com.busbooking.app.service;

import com.busbooking.app.entity.Bus;
import com.busbooking.app.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusService {
    @Autowired
    private BusRepository busRepository;

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Optional<Bus> getBusById(Long id) {
        return busRepository.findById(id);
    }

    public List<Bus> searchBuses(String source, String destination) {
        return busRepository.searchBuses(source, destination);
    }
}
