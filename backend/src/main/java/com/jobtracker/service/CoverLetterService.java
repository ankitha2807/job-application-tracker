package com.jobtracker.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class CoverLetterService {

    private final ChatClient chatClient;

    public CoverLetterService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generateCoverLetter(String jobDescription, String skills) {
        String prompt = """
                You are a professional career coach and cover letter expert.
                Write a personalized, compelling cover letter based on the following:
                
                **Job Description:**
                %s
                
                **Candidate's Skills:**
                %s
                
                Guidelines:
                - Keep it professional yet personable
                - Highlight relevant skills that match the job description
                - Use a confident but not arrogant tone
                - Keep it concise (about 300-400 words)
                - Include a strong opening and closing
                - Do NOT include placeholder names or addresses — write the body content only
                """.formatted(jobDescription, skills);

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}
