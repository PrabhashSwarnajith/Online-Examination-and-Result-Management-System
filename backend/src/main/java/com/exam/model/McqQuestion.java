package com.exam.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("MCQ")
public class McqQuestion extends Question {

    @Column(length = 500)
    private String explanation;

    public McqQuestion() {}

    public McqQuestion(Long examId, String questionText,
                       String optionA, String optionB, String optionC, String optionD,
                       String correctAnswer, String explanation) {
        super(examId, questionText, optionA, optionB, optionC, optionD, correctAnswer);
        this.explanation = explanation;
    }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
