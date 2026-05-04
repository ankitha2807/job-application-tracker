package com.jobtracker.controller;

import com.jobtracker.dto.CoverLetterRequest;
import com.jobtracker.service.CoverLetterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cover-letter")
public class CoverLetterController {

    private final CoverLetterService coverLetterService;

    public CoverLetterController(CoverLetterService coverLetterService) {
        this.coverLetterService = coverLetterService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, String>> generate(@RequestBody CoverLetterRequest request) {
        String coverLetter = coverLetterService.generateCoverLetter(
                request.getJobDescription(),
                request.getSkills()
        );
        return ResponseEntity.ok(Map.of("coverLetter", coverLetter));
    }
}
