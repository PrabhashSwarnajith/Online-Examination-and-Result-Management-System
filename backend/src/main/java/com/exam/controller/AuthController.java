package com.exam.controller;

import com.exam.model.User;
import com.exam.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = authService.login(username, password);
        if (user.isPresent()) {
            User u = user.get();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "username", u.getUsername(),
                "fullName", u.getFullName(),
                "role", u.getRole()
            ));
        }
        return ResponseEntity.status(401).body(Map.of(
            "success", false,
            "message", "Invalid username or password"
        ));
    }
}
