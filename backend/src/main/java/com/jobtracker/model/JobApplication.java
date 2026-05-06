package com.jobtracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.SAVED;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String salary;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    @Column
    private LocalDate dateApplied;

    @Column
    private LocalDate dateInterviewScheduled;

    @Column
    private LocalDate dateOfferReceived;

    @Column
    private LocalDate dateRejected;

    @Column
    private Integer responseTimeDays; // Days to first response

    @Column
    private String interviewNotes;

    @Column
    private String rejectionReason;

    @com.fasterxml.jackson.annotation.JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public JobApplication() {}

    // --- Getters & Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }

    public LocalDate getDateApplied() { return dateApplied; }
    public void setDateApplied(LocalDate dateApplied) { this.dateApplied = dateApplied; }

    public LocalDate getDateInterviewScheduled() { return dateInterviewScheduled; }
    public void setDateInterviewScheduled(LocalDate dateInterviewScheduled) { this.dateInterviewScheduled = dateInterviewScheduled; }

    public LocalDate getDateOfferReceived() { return dateOfferReceived; }
    public void setDateOfferReceived(LocalDate dateOfferReceived) { this.dateOfferReceived = dateOfferReceived; }

    public LocalDate getDateRejected() { return dateRejected; }
    public void setDateRejected(LocalDate dateRejected) { this.dateRejected = dateRejected; }

    public Integer getResponseTimeDays() { return responseTimeDays; }
    public void setResponseTimeDays(Integer responseTimeDays) { this.responseTimeDays = responseTimeDays; }

    public String getInterviewNotes() { return interviewNotes; }
    public void setInterviewNotes(String interviewNotes) { this.interviewNotes = interviewNotes; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
