package com.example.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.json.simple.JSONObject;

import com.example.project.Model.ApplicationUser;
import com.example.project.repository.ApplicationUserRepository;
import com.example.project.security.JwtUtil;

@Service
public class ApplicationUserService {

  @Autowired
  ApplicationUserRepository applicationUserRepository;

  @Autowired
  JwtUtil jwtUtil;

  public JSONObject register(ApplicationUser applicationUser) {

    JSONObject response = new JSONObject();
    if (applicationUser.getUser_name() != null){// && !applicationUserRepository.findById(applicationUser.getUser_name()).isPresent())  {
      ApplicationUser savedEntity = applicationUserRepository.save(applicationUser);
      response.put("message", "Registration successful");
      response.put("success", true);
    } else {
      response.put("message", "Password or username policy failed");
      response.put("success", false);
    }
    return response;
  }

  public JSONObject signin(ApplicationUser applicationUser) {
    if (applicationUser.getUser_name() == null) {
      JSONObject response = new JSONObject();
      response.put("message", "Username or Password is Incorrect");
      response.put("success", false);
      return response;
    }
    ApplicationUser user = applicationUserRepository.findById(applicationUser.getUser_name()).orElse(null);
    JSONObject response = new JSONObject();
    if (user != null && user.getPassword() != null
        && user.getPassword().equalsIgnoreCase(applicationUser.getPassword())) {
      response.put("message", "Authentication successful");
      response.put("token", jwtUtil.createToken(user.getUser_name()));
      response.put("id", user.getUser_name());
      response.put("success", true);
    } else {
      response.put("message", "Username or Password is Incorrect");
      response.put("success", false);
    }

    return response;
  }

  public ApplicationUser viewProfile(String userId) {
    if (userId != null) {
      return applicationUserRepository.findById(userId).orElse(null);
    }
    return null;
  }

public JSONObject updateProfile(String userId, ApplicationUser applicationUser) {
  JSONObject response = new JSONObject();
  if (applicationUser.getUser_name() != null) {
    ApplicationUser savedEntity = applicationUserRepository.save(applicationUser);
    response.put("message", "Registration successful");
    response.put("success", true);
  } else {
    response.put("message", "Password or username policy failed");
    response.put("success", false);
  }
  return response;
}

}
