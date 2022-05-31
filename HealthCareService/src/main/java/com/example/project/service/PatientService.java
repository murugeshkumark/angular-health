package com.example.project.service;

import java.util.Date;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.Model.Patient;
import com.example.project.repository.PatientRepository;

@Service
public class PatientService {

  @Autowired
  PatientRepository patientRepository;

  public JSONObject register(Patient patient) {
    JSONObject jsonObject = new JSONObject();
    if (patient == null ) {
      jsonObject.put("message", "Registration failure");
    } else {
      Patient savedEntity = patientRepository.save(patient);
      if(savedEntity!=null){
        jsonObject.put("message", "Registration successful");
      }
    }
    return jsonObject;
  }

public List<Patient> list() {
	return patientRepository.findAll();
}

public Patient view(String id) {
	return patientRepository.findById(id).orElse(null);
}

public void delete(String id){
   patientRepository.deleteById(id);
}

}
