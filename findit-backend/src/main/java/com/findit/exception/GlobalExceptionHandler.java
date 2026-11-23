package com.findit.exception;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<List<String>> handleValidationException(
	        MethodArgumentNotValidException ex) {

		List<String> messages = ex.getBindingResult()
		        .getFieldErrors()
		        .stream()
		        .map(error -> error.getDefaultMessage())
		        .toList();

		return ResponseEntity.badRequest().body(messages);
	}
	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity<String> handleResponseStatusException(
	        ResponseStatusException ex) {

	    return ResponseEntity
	            .status(ex.getStatusCode())
	            .body(ex.getReason());
	}
}
