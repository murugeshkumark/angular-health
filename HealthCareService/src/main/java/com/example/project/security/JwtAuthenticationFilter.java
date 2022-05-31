package com.example.project.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.project.Model.ApplicationUser;
import com.example.project.service.UserAuthService;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  UserAuthService userAuthService;

  @Autowired
  JwtUtil jwtUtil;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    // TODO Auto-generated method stub

    String header = request.getHeader(HttpHeaders.AUTHORIZATION);

    if (header == null || header.isEmpty()) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = header.split(" ")[1].trim();
    UserDetails userDetails = userAuthService.loadUserByUsername(jwtUtil.getUsername(token));
    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
        userDetails, null, userDetails.getAuthorities());
usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    filterChain.doFilter(request, response);

  }

}