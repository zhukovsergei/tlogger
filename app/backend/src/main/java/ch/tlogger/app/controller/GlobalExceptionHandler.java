package ch.tlogger.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({AuthenticationException.class, UsernameNotFoundException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public Map<String, String> handleAuthException(Exception ex) {
        return Map.of("error", "Invalid credentials");
    }
} 