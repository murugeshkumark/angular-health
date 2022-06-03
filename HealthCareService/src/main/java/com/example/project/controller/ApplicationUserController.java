package com.example.project.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.Model.ApplicationUser;
import com.example.project.service.ApplicationUserService;

@RestController
public class ApplicationUserController {

  @Autowired
  ApplicationUserService applicationUserService;

  @RequestMapping(method = RequestMethod.POST, value = "/register")
  public JSONObject register(@RequestBody ApplicationUser applicationUser) {
    return applicationUserService.register(applicationUser);
  }

  @RequestMapping(method = RequestMethod.POST, value = "/signin")
  public JSONObject signin(@RequestBody ApplicationUser applicationUser) {
    return applicationUserService.signin(applicationUser);               
  }

  @RequestMapping(method=RequestMethod.GET, value="/viewprofile/{userId}")
  public ApplicationUser viewprofile(@PathVariable("userId") String userId){
    return applicationUserService.viewProfile(userId);
  }

  @RequestMapping(method=RequestMethod.PUT, value="/editprofile/{userId}")
  public JSONObject updateprofile(@PathVariable("userId") String userId, @RequestBody ApplicationUser applicationUser){
    return applicationUserService.updateProfile(userId,applicationUser);
  }

}







