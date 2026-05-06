package com.jobtracker.controller;

import com.jobtracker.dto.DashboardStatsResponse;
import com.jobtracker.service.JobApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final JobApplicationService service;

    public DashboardController(JobApplicationService service) {
        this.service = service;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getStats() {
        return ResponseEntity.ok(service.getDashboardStats());
    }

    @GetMapping
    public ResponseEntity<DashboardStatsResponse> getRootStats() {
        return ResponseEntity.ok(service.getDashboardStats());
    }
}
