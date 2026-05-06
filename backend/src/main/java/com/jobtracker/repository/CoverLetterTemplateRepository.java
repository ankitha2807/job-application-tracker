package com.jobtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jobtracker.model.CoverLetterTemplate;
import com.jobtracker.model.User;

@Repository
public interface CoverLetterTemplateRepository extends JpaRepository<CoverLetterTemplate, Long> {

    List<CoverLetterTemplate> findByCreatedBy(User user);

    List<CoverLetterTemplate> findByIsPublicTrue();

    @Query("SELECT t FROM CoverLetterTemplate t WHERE t.createdBy = ?1 OR t.isPublic = true")
    List<CoverLetterTemplate> findByCreatedByOrPublic(User user);
}