package com.exam.config;

import com.exam.model.Exam;
import com.exam.model.Question;
import com.exam.model.Result;
import com.exam.model.Student;
import com.exam.model.User;
import com.exam.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Seeds the H2 in-memory database with sample data on every startup.
 * OOP Concept: uses all domain model classes demonstrating encapsulation.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private UserRepository     userRepo;
    @Autowired private StudentRepository  studentRepo;
    @Autowired private ExamRepository     examRepo;
    @Autowired private QuestionRepository questionRepo;
    @Autowired private ResultRepository   resultRepo;

    @Override
    public void run(String... args) {
        seedUsers();
        seedStudents();
        seedExams();
        seedQuestions();
        seedResults();
        System.out.println("✅ Sample data loaded successfully.");
    }

    // ─────────────────────────────────────────────
    //  USERS
    // ─────────────────────────────────────────────
    private void seedUsers() {
        userRepo.save(new User("admin", "admin123", "Administrator", "ADMIN"));
    }

    // ─────────────────────────────────────────────
    //  STUDENTS  (10 records)
    // ─────────────────────────────────────────────
    private void seedStudents() {
        studentRepo.save(new Student("Alice Johnson",   "alice@university.edu",    "Computer Science",          "0123456789"));
        studentRepo.save(new Student("Bob Smith",        "bob@university.edu",      "Information Technology",    "0198765432"));
        studentRepo.save(new Student("Carol White",      "carol@university.edu",    "Software Engineering",      "0112233445"));
        studentRepo.save(new Student("David Lee",        "david@university.edu",    "Computer Science",          "0134567890"));
        studentRepo.save(new Student("Emma Davis",       "emma@university.edu",     "Cybersecurity",             "0156789012"));
        studentRepo.save(new Student("Frank Turner",     "frank@university.edu",    "Information Technology",    "0178901234"));
        studentRepo.save(new Student("Grace Kim",        "grace@university.edu",    "Artificial Intelligence",   "0190123456"));
        studentRepo.save(new Student("Henry Brown",      "henry@university.edu",    "Software Engineering",      "0111223344"));
        studentRepo.save(new Student("Isabella Clark",   "isabella@university.edu", "Computer Science",          "0122334455"));
        studentRepo.save(new Student("James Wilson",     "james@university.edu",    "Data Science",              "0133445566"));
    }

    // ─────────────────────────────────────────────
    //  EXAMS  (5 records)
    // ─────────────────────────────────────────────
    private void seedExams() {
        examRepo.save(new Exam("Midterm Exam",    "Data Structures",             "2026-06-15", 90));
        examRepo.save(new Exam("Final Exam",      "Algorithms",                  "2026-07-20", 120));
        examRepo.save(new Exam("Quiz 1",          "Database Systems",            "2026-05-30", 30));
        examRepo.save(new Exam("Practical Test",  "Object-Oriented Programming", "2026-06-25", 60));
        examRepo.save(new Exam("Semester Final",  "Computer Networks",           "2026-08-10", 120));
    }

    // ─────────────────────────────────────────────
    //  QUESTIONS  (15 records — 3 per exam)
    //  OOP: all saved as Question (subclass of Question)
    // ─────────────────────────────────────────────
    private void seedQuestions() {

        // Exam 1 — Data Structures
        questionRepo.save(new Question(1L, "What is a Stack?",
                "LIFO structure", "FIFO structure", "Tree structure", "Graph structure", "A"));
        questionRepo.save(new Question(1L, "Which operation is O(1) for a singly linked list?",
                "Search by value", "Insert at head", "Sort elements", "Find minimum", "B"));
        questionRepo.save(new Question(1L, "Which data structure uses FIFO ordering?",
                "Stack", "Tree", "Queue", "Graph", "C"));

        // Exam 2 — Algorithms
        questionRepo.save(new Question(2L, "What does Big O notation measure?",
                "Memory usage only", "Time complexity of an algorithm", "Code readability", "Number of variables", "B"));
        questionRepo.save(new Question(2L, "What is the time complexity of Binary Search?",
                "O(n)", "O(n²)", "O(log n)", "O(1)", "C"));
        questionRepo.save(new Question(2L, "Which sorting algorithm has O(n log n) average case?",
                "Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "D"));

        // Exam 3 — Database Systems
        questionRepo.save(new Question(3L, "What does SQL stand for?",
                "Structured Query Language", "Simple Question Logic", "System Query List", "Sequential Queue Language", "A"));
        questionRepo.save(new Question(3L, "Which SQL command retrieves data from a table?",
                "INSERT", "UPDATE", "SELECT", "DELETE", "C"));
        questionRepo.save(new Question(3L, "What is a primary key?",
                "A key that allows duplicates", "A foreign reference key",
                "A unique identifier for each row", "A key used only for searching", "C"));

        // Exam 4 — OOP
        questionRepo.save(new Question(4L, "Which OOP concept hides internal details?",
                "Inheritance", "Polymorphism", "Abstraction", "Encapsulation", "C"));
        questionRepo.save(new Question(4L, "What is Inheritance in OOP?",
                "Hiding data inside a class", "One class acquiring properties of another",
                "Overloading a method", "Creating objects from a class", "B"));
        questionRepo.save(new Question(4L, "Which keyword is used to inherit a class in Java?",
                "implements", "inherits", "extends", "super", "C"));

        // Exam 5 — Computer Networks
        questionRepo.save(new Question(5L, "What does IP stand for?",
                "Internal Protocol", "Internet Protocol", "Interchange Package", "Integrated Platform", "B"));
        questionRepo.save(new Question(5L, "Which OSI layer is responsible for routing?",
                "Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer", "C"));
        questionRepo.save(new Question(5L, "What protocol is used to send emails?",
                "HTTP", "FTP", "SMTP", "DNS", "C"));
    }

    // ─────────────────────────────────────────────
    //  RESULTS  (15 records — spread of all grades)
    //  OOP: Result.calculateGrade() sets grade automatically
    // ─────────────────────────────────────────────
    private void seedResults() {
        resultRepo.save(new Result(1L,  1L, 92.0));   // A+
        resultRepo.save(new Result(2L,  1L, 72.0));   // B
        resultRepo.save(new Result(3L,  1L, 85.0));   // A
        resultRepo.save(new Result(4L,  2L, 78.0));   // B
        resultRepo.save(new Result(5L,  2L, 91.0));   // A+
        resultRepo.save(new Result(6L,  2L, 55.0));   // D
        resultRepo.save(new Result(7L,  3L, 88.0));   // A
        resultRepo.save(new Result(8L,  3L, 63.0));   // C
        resultRepo.save(new Result(9L,  3L, 45.0));   // F
        resultRepo.save(new Result(10L, 4L, 97.0));   // A+
        resultRepo.save(new Result(1L,  4L, 81.0));   // A
        resultRepo.save(new Result(2L,  4L, 68.0));   // C
        resultRepo.save(new Result(3L,  5L, 74.0));   // B
        resultRepo.save(new Result(4L,  5L, 50.0));   // D
        resultRepo.save(new Result(5L,  5L, 38.0));   // F
    }
}
