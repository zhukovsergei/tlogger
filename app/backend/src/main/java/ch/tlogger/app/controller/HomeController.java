package ch.tlogger.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("name", "TLogger API");
        response.put("version", "1.0.0");
        response.put("message", "Welcome to TLogger API");
        response.put("endpoints", new String[]{"/api/health"});
        return response;
    }
} 