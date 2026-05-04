package com.jobtracker.dto;

public class CoverLetterRequest {
    private String jobDescription;
    private String skills;

    public CoverLetterRequest() {}

    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
}
