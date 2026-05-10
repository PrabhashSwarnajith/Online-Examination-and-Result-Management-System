package com.exam.service;

import com.exam.model.Result;
import com.exam.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    public Optional<Result> getResultById(Long id) {
        return resultRepository.findById(id);
    }

    public Result createResult(Result result) {
        result.setGrade(Result.computeGrade(result.getMarks()));
        return resultRepository.save(result);
    }

    public Result updateResult(Long id, Result updated) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found: " + id));
        result.setStudentId(updated.getStudentId());
        result.setExamId(updated.getExamId());
        result.setMarks(updated.getMarks());
        result.setGrade(Result.computeGrade(updated.getMarks()));
        return resultRepository.save(result);
    }

    public void deleteResult(Long id) {
        resultRepository.deleteById(id);
    }
}
