package com.example.ipwhitelisttracker.controller;

import com.example.ipwhitelisttracker.model.CustomerApps;
import com.example.ipwhitelisttracker.model.CustomerAppsDto;
import com.example.ipwhitelisttracker.service.CustomerAppsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RequiredArgsConstructor
@RestController
public class CustomerAppsController {
    private final CustomerAppsService customerAppsService;

    @CrossOrigin
    @PostMapping("/customerapps")
    public ResponseEntity<?> save(@RequestBody CustomerAppsDto customerAppsDto){
        System.out.println("customerAppsUid " + customerAppsDto.getUid());
       //System.out.println("customerUid" + customerApps.cu());
        System.out.println("appInfoUid " + customerAppsDto.getAppInfoUid());




        return new ResponseEntity<>(customerAppsService.create(customerAppsDto), HttpStatus.CREATED);
    }
    @CrossOrigin
    @GetMapping("/customerapps")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(customerAppsService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/customerapps/{id}")
    public ResponseEntity<?> findAll(@PathVariable Long id){

        return new ResponseEntity<>(customerAppsService.findCustomerApps(id), HttpStatus.OK);
    }
    @CrossOrigin
    @PutMapping("/customerapps/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CustomerApps customerApps){
        return new ResponseEntity<>(customerAppsService.update(id, customerApps), HttpStatus.OK);
    }
    @CrossOrigin
    @DeleteMapping("/customerapps/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        return new ResponseEntity<>(customerAppsService.delete(id), HttpStatus.OK);
    }
}
