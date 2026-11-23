package com.findit.controller;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.findit.dto.LoginResponse;
import com.findit.dto.UserLoginRequest;
import com.findit.dto.UserRegistrationRequest;
import com.findit.dto.UserResponse;
import com.findit.service.UserService;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import com.findit.entity.User;
import com.findit.dto.UserResponse;
@RestController
public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("api/users/register")
	public UserResponse registerUser(
			@Valid @RequestBody UserRegistrationRequest request
			) {
		if(userService.emailExists(request.getEmail())) {
			throw new ResponseStatusException(
	                HttpStatus.CONFLICT,
	                "Email is already registered"
	        );
		}
		return userService.registerUser(request);
	}
	
	@PostMapping("/api/users/login")
	public LoginResponse  loginUser(
	        @RequestBody UserLoginRequest request) {

	    return userService.loginUser(request);
	}
	@GetMapping("/api/admin/users")
	public ResponseEntity<List<UserResponse>> getAllUsers() {

	    List<User> users = userService.getAllUsers();

	    List<UserResponse> responses = users.stream()
	            .map(user -> {
	                UserResponse response = new UserResponse();
	                response.setId(user.getId());
	                response.setName(user.getName());
	                response.setEmail(user.getEmail());
	                response.setRole(user.getRole());
	                return response;
	            })
	            .toList();

	    return ResponseEntity.ok(responses);
	}
}
