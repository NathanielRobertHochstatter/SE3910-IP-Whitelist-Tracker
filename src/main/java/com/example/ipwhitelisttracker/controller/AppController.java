package com.example.ipwhitelisttracker.controller;

import com.example.ipwhitelisttracker.model.ApplicationInfo;
import com.example.ipwhitelisttracker.service.AppService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;


@CrossOrigin
@RequiredArgsConstructor
@RestController
public class AppController {
    private final AppService appService;

    @CrossOrigin
    @PostMapping("/applicationInfo")
    public ResponseEntity<?> save(@RequestBody ApplicationInfo applicationInfo){

        System.out.println("appInfoUid " + applicationInfo.getAppInfoUid());
        System.out.println("appInfoDescription " + applicationInfo.getAppInfoDescription());
        applicationInfo.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        applicationInfo.setCreatedBy("Admin");
        applicationInfo.setModifiedAt(new Timestamp(System.currentTimeMillis()));
        applicationInfo.setModifiedBy("Admin");
        return new ResponseEntity<>(appService.create(applicationInfo), HttpStatus.CREATED);

    }
    @CrossOrigin
    @GetMapping("/applicationInfo")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(appService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/applicationInfo/{id}")
    public ResponseEntity<?> findAll(@PathVariable Long id){

        return new ResponseEntity<>(appService.findApplicationInfo(id), HttpStatus.OK);
    }
    @CrossOrigin
    @PutMapping("/applicationInfo/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ApplicationInfo applicationInfo){
        //System.out.println(id);
        System.out.println("appId " + applicationInfo.getAppId());
        System.out.println("desc " + applicationInfo.getAppInfoDescription());
        return new ResponseEntity<>(appService.update(id, applicationInfo), HttpStatus.OK);
    }
    @CrossOrigin
    @DeleteMapping("/applicationInfo/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        return new ResponseEntity<>(appService.delete(id), HttpStatus.OK);
    }
}
