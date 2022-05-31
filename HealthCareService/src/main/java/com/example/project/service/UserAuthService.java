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
import com.example.project.repository.ApplicationUserRepository;

@Service
public class UserAuthService implements UserDetailsService {

  @Autowired
  ApplicationUserRepository applicationUserRepository;

  @Override
  public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
    ApplicationUser applicationUser = applicationUserRepository.findById(arg0).orElse(null);
    if (applicationUser == null) {
      throw new UsernameNotFoundException("user name not found " + arg0);
    }
    return null;
  }
}