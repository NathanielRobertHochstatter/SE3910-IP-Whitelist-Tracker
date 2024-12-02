package com.example.ipwhitelisttracker.controller;

import com.example.ipwhitelisttracker.dto.ServerInfoDto;
import com.example.ipwhitelisttracker.model.ServerInfo;
import com.example.ipwhitelisttracker.service.ServerInfoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.modelmapper.ModelMapper;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ServerInfoController {
    private final ServerInfoService serverInfoService;

    //add
    @PostMapping("/serverInfo")
    public ResponseEntity<?> save(@RequestBody ServerInfoDto serverInfoDto) {
        // Call the service layer method to create the ServerInfo object
        try {
            ServerInfo serverInfo = serverInfoService.create(serverInfoDto);
            return new ResponseEntity<>(serverInfo, HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("ApplicationInfo not found with ID: " + serverInfoDto.getAppInfoUid(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating ServerInfo: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //get all
    @CrossOrigin
    @GetMapping("serverInfo")
    public ResponseEntity<?> findAll() {
        List<ServerInfo> serverInfoList = serverInfoService.findAll();
        if (serverInfoList.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(serverInfoList);
        }
    }


    //search
    @CrossOrigin
    @GetMapping("/serverInfo/{id}")
    public ResponseEntity<?> findAll(@PathVariable Long id){
        try{
            ServerInfo serverInfo = serverInfoService.findServerInfo(id);
            return ResponseEntity.ok(serverInfo);
        }catch(IllegalArgumentException e){
            return ResponseEntity.notFound().build();
        }
    }

    //edit
    @CrossOrigin
    @PutMapping("/serverInfo/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ServerInfo serverInfo){
        try{
            ServerInfo updatedServerInfo = serverInfoService.update(id, serverInfo);
            return ResponseEntity.ok(updatedServerInfo);
        } catch (IllegalArgumentException e){
            return ResponseEntity.notFound().build();
        }
    }

    //delete
    @CrossOrigin
    @DeleteMapping("/serverInfo/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try{
            serverInfoService.delete(id);
            return ResponseEntity.ok().build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.notFound().build();
        }
    }


    //export to excel file
    //No mapping needed since its not exposed as a controller endpoint
    @CrossOrigin
    @GetMapping("/serverInfo/export")
    public ResponseEntity<?> exportToExcel(HttpServletResponse response){
        try{
            //response content type
            response.setContentType("application/vnd.ms-excel");

            //response header
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename = server_info.xlsx";
            response.setHeader(headerKey, headerValue);

            //export server info to excel and write to response output
            serverInfoService.exportToExcel(response.getOutputStream());
            return ResponseEntity.ok().build();
        }catch (IOException e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
