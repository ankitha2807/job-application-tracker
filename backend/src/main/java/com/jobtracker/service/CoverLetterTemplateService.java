package com.jobtracker.service;

import com.jobtracker.model.CoverLetterTemplate;
import com.jobtracker.model.User;
import com.jobtracker.repository.CoverLetterTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoverLetterTemplateService {

    @Autowired
    private CoverLetterTemplateRepository templateRepository;

    public List<CoverLetterTemplate> getAllTemplatesForUser(User user) {
        return templateRepository.findByCreatedByOrPublic(user);
    }

    public List<CoverLetterTemplate> getUserTemplates(User user) {
        return templateRepository.findByCreatedBy(user);
    }

    public Optional<CoverLetterTemplate> getTemplateById(Long id) {
        return templateRepository.findById(id);
    }

    public CoverLetterTemplate saveTemplate(CoverLetterTemplate template) {
        return templateRepository.save(template);
    }

    public void deleteTemplate(Long id) {
        templateRepository.deleteById(id);
    }

    public boolean isTemplateOwner(Long templateId, User user) {
        Optional<CoverLetterTemplate> template = templateRepository.findById(templateId);
        return template.isPresent() && template.get().getCreatedBy().getId().equals(user.getId());
    }
}