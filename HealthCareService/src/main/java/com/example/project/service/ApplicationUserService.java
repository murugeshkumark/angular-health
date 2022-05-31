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

  public JSONObject register(ApplicationUser applicationUser) {
    applicationUserRepository.save(applicationUser);
    JSONObject response = new JSONObject();
    response.put("message", "Registration successful");
    return response;
  }

public JSONObject signin(ApplicationUser applicationUser) {
  ApplicationUser user = applicationUserRepository.findById(applicationUser.getUser_name()).orElse(null);
  JSONObject response = new JSONObject();
  if(user != null  && user.getPassword()!=null && user.getPassword().equalsIgnoreCase(applicationUser.getPassword())){
    response.put("message", "Authentication successful");
    response.put("token","asdsadas");
    response.put("id",user.getUser_name())
  }else{
response.put("message", "Username or Password is Incorrect");
  }
	
   return response;
}

}
