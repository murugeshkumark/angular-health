package com.example.project.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.project.Model.ApplicationUser;
import com.example.project.Model.CustomUserDetails;
import com.example.project.repository.ApplicationUserRepository;

@Service
public class UserAuthService  implements UserDetailsService{


  @Autowired
  ApplicationUserRepository applicationUserRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    ApplicationUser applicationUser = applicationUserRepository.findById(username).orElse(null);
    if(applicationUser == null){
      throw new UsernameNotFoundException("username not found "+username);
    }
    return new CustomUserDetails(applicationUser);
  }

  
}