package com.jobtracker.service;

import com.jobtracker.dto.DashboardStatsResponse;
import com.jobtracker.model.ApplicationStatus;
import com.jobtracker.model.JobApplication;
import com.jobtracker.model.User;
import com.jobtracker.repository.JobApplicationRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public List<JobApplication> getAllForCurrentUser() {
        return repository.findAllByUserIdOrderByDateAppliedDesc(getCurrentUser().getId());
    }

    public JobApplication getById(Long id) {
        return repository.findByIdAndUserId(id, getCurrentUser().getId())
                .orElseThrow(() -> new RuntimeException("Job application not found"));
    }

    public JobApplication create(JobApplication job) {
        job.setUser(getCurrentUser());
        return repository.save(job);
    }

    public JobApplication update(Long id, JobApplication updated) {
        JobApplication existing = getById(id);
        existing.setCompany(updated.getCompany());
        existing.setRole(updated.getRole());
        existing.setStatus(updated.getStatus());
        existing.setDescription(updated.getDescription());
        existing.setDateApplied(updated.getDateApplied());
        return repository.save(existing);
    }

    public DashboardStatsResponse getDashboardStats() {
        List<JobApplication> jobs = getAllForCurrentUser();
        Map<ApplicationStatus, Long> counts = jobs.stream()
                .collect(Collectors.groupingBy(JobApplication::getStatus, Collectors.counting()));

        return new DashboardStatsResponse(
                jobs.size(),
                counts.getOrDefault(ApplicationStatus.SAVED, 0L),
                counts.getOrDefault(ApplicationStatus.APPLIED, 0L),
                counts.getOrDefault(ApplicationStatus.INTERVIEW, 0L),
                counts.getOrDefault(ApplicationStatus.OFFER, 0L),
                counts.getOrDefault(ApplicationStatus.REJECTED, 0L)
        );
    }

    public void delete(Long id) {
        JobApplication job = getById(id);
        repository.delete(job);
    }
}
