package com.example.project.security;

import java.nio.charset.Charset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.project.Model.ApplicationUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;



@Component
public class JwtUtil {

  @Value("${jwt.secret}")
  private String secret;

	public String getUsername(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token.replace("", "")).getBody().getSubject();
  }

  public String createToken(String username){
      return Jwts.builder().setSubject(username)
      .signWith(SignatureAlgorithm.HS512, secret)
      .setExpiration(new Date(System.currentTimeMillis()+10000))
      .compact();
  }
  


}