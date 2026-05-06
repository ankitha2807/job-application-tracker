package com.jobtracker.controller;

import com.jobtracker.model.CoverLetterTemplate;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.service.CoverLetterTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/templates")
@CrossOrigin(origins = "http://localhost:5173")
public class CoverLetterTemplateController {

    @Autowired
    private CoverLetterTemplateService templateService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<CoverLetterTemplate>> getAllTemplates(Authentication authentication) {
        try {
            User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
            List<CoverLetterTemplate> templates = templateService.getAllTemplatesForUser(user);
            return ResponseEntity.ok(templates);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<CoverLetterTemplate>> getUserTemplates(Authentication authentication) {
        try {
            User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
            List<CoverLetterTemplate> templates = templateService.getUserTemplates(user);
            return ResponseEntity.ok(templates);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<CoverLetterTemplate> createTemplate(
            @RequestBody CoverLetterTemplate template,
            Authentication authentication) {
        try {
            User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
            template.setCreatedBy(user);
            CoverLetterTemplate savedTemplate = templateService.saveTemplate(template);
            return ResponseEntity.ok(savedTemplate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoverLetterTemplate> updateTemplate(
            @PathVariable Long id,
            @RequestBody CoverLetterTemplate templateData,
            Authentication authentication) {
        try {
            User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
            if (!templateService.isTemplateOwner(id, user)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Optional<CoverLetterTemplate> existingTemplate = templateService.getTemplateById(id);
            if (existingTemplate.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            CoverLetterTemplate template = existingTemplate.get();
            template.setName(templateData.getName());
            template.setDescription(templateData.getDescription());
            template.setTemplateContent(templateData.getTemplateContent());
            template.setPublic(templateData.isPublic());

            CoverLetterTemplate updatedTemplate = templateService.saveTemplate(template);
            return ResponseEntity.ok(updatedTemplate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long id, Authentication authentication) {
        try {
            User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
            if (!templateService.isTemplateOwner(id, user)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            templateService.deleteTemplate(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}