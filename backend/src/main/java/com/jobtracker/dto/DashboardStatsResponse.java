package com.jobtracker.dto;

public class DashboardStatsResponse {
    private long totalApplications;
    private long savedCount;
    private long appliedCount;
    private long interviewCount;
    private long offerCount;
    private long rejectedCount;

    public DashboardStatsResponse() {}

    public DashboardStatsResponse(long totalApplications, long savedCount, long appliedCount,
                                  long interviewCount, long offerCount, long rejectedCount) {
        this.totalApplications = totalApplications;
        this.savedCount = savedCount;
        this.appliedCount = appliedCount;
        this.interviewCount = interviewCount;
        this.offerCount = offerCount;
        this.rejectedCount = rejectedCount;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public long getSavedCount() {
        return savedCount;
    }

    public void setSavedCount(long savedCount) {
        this.savedCount = savedCount;
    }

    public long getAppliedCount() {
        return appliedCount;
    }

    public void setAppliedCount(long appliedCount) {
        this.appliedCount = appliedCount;
    }

    public long getInterviewCount() {
        return interviewCount;
    }

    public void setInterviewCount(long interviewCount) {
        this.interviewCount = interviewCount;
    }

    public long getOfferCount() {
        return offerCount;
    }

    public void setOfferCount(long offerCount) {
        this.offerCount = offerCount;
    }

    public long getRejectedCount() {
        return rejectedCount;
    }

    public void setRejectedCount(long rejectedCount) {
        this.rejectedCount = rejectedCount;
    }
}
