package com.example.project.controller;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.Model.Patient;
import com.example.project.service.PatientService;
@RestController("/patients")
public class PatientController {

  @Autowired
  private PatientService patientService;

  @RequestMapping(method = RequestMethod.POST, value = "/register")
  public JSONObject register(@RequestBody Patient patient){
      return patientService.register(patient);
  }

  @RequestMapping(method = RequestMethod.GET, value="/list/")
  public List<Patient> list(){
    return patientService.list();
  }

  @RequestMapping(method = RequestMethod.GET, value="/view/{Id}")
  public Patient view(@PathVariable("Id") String id){
    return patientService.view(id);
  }

  @RequestMapping(method = RequestMethod.DELETE, value = "/delete/{Id}")
  public String delete(@PathVariable("Id") String id){
    patientService.delete(id);
    return "";
  }
	
}
