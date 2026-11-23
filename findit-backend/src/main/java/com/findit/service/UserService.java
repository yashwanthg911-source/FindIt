package com.findit.service;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.findit.dto.LoginResponse;
import com.findit.dto.UserLoginRequest;
import com.findit.dto.UserRegistrationRequest;
import com.findit.dto.UserResponse;
import com.findit.entity.User;
import com.findit.repository.UserRepository;

@Service
public class UserService {

	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	

	public UserService(
	        UserRepository userRepository,
	        PasswordEncoder passwordEncoder,
	        JwtService jwtService) {

	    this.userRepository = userRepository;
	    this.passwordEncoder = passwordEncoder;
	    this.jwtService = jwtService;
	}
	public boolean emailExists(String email) {
	    return userRepository.existsByEmail(email);
	}
	
	public UserResponse registerUser(UserRegistrationRequest request) {

	    User user = new User();

	    user.setName(request.getName());
	    user.setEmail(request.getEmail());
	    user.setPassword(
	            passwordEncoder.encode(request.getPassword())
	    );

	    User savedUser =  userRepository.save(user);
	   
	    UserResponse response = new UserResponse();
	    
	    response.setId(savedUser.getId());
	    response.setName(savedUser.getName());
	    response.setEmail(savedUser.getEmail());
	    response.setRole(savedUser.getRole());
	    
	    return response;
	}
	
	public LoginResponse loginUser(UserLoginRequest request) {

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElseThrow(() -> new ResponseStatusException(
	                    HttpStatus.UNAUTHORIZED,
	                    "Invalid email or password"
	            ));

	    if (!passwordEncoder.matches(
	            request.getPassword(),
	            user.getPassword())) {

	        throw new ResponseStatusException(
	                HttpStatus.UNAUTHORIZED,
	                "Invalid email or password"
	        );
	    }

	    UserResponse response = new UserResponse();

	    response.setId(user.getId());
	    response.setName(user.getName());
	    response.setEmail(user.getEmail());
	    response.setRole(user.getRole());
	    
	    String token = jwtService.generateToken(user);

	    LoginResponse loginResponse = new LoginResponse();

	    loginResponse.setUser(response);
	    loginResponse.setToken(token);

	    return loginResponse;

	}
	
	public List<User> getAllUsers() {
	    return userRepository.findAll();
	}
}
