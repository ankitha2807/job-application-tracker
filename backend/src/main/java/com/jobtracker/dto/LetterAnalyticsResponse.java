package com.jobtracker.dto;

public class LetterAnalyticsResponse {
    private long totalWithLetters;
    private long interviewsWithLetters;
    private long offersWithLetters;
    private double interviewRate;
    private double offerRate;
    private double avgResponseTime;

    public LetterAnalyticsResponse(long totalWithLetters, long interviewsWithLetters,
                                 long offersWithLetters, double interviewRate,
                                 double offerRate, double avgResponseTime) {
        this.totalWithLetters = totalWithLetters;
        this.interviewsWithLetters = interviewsWithLetters;
        this.offersWithLetters = offersWithLetters;
        this.interviewRate = interviewRate;
        this.offerRate = offerRate;
        this.avgResponseTime = avgResponseTime;
    }

    // Getters
    public long getTotalWithLetters() { return totalWithLetters; }
    public long getInterviewsWithLetters() { return interviewsWithLetters; }
    public long getOffersWithLetters() { return offersWithLetters; }
    public double getInterviewRate() { return interviewRate; }
    public double getOfferRate() { return offerRate; }
    public double getAvgResponseTime() { return avgResponseTime; }
}