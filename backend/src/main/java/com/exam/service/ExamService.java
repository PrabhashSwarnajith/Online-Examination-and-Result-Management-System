package com.exam.service;

import com.exam.model.Exam;
import com.exam.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(Long id) {
        return examRepository.findById(id);
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(Long id, Exam updated) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found: " + id));
        exam.setExamName(updated.getExamName());
        exam.setSubject(updated.getSubject());
        exam.setExamDate(updated.getExamDate());
        exam.setDuration(updated.getDuration());
        return examRepository.save(exam);
    }

    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
}
