package com.example.ipwhitelisttracker.controller;

import com.example.ipwhitelisttracker.dto.ServerInfoDto;
import com.example.ipwhitelisttracker.model.ServerInfo;
import com.example.ipwhitelisttracker.service.ServerInfoService;
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
    @CrossOrigin
    @PostMapping("serverInfo")
    public ResponseEntity<?> save (@RequestBody ServerInfo serverInfo){

        ServerInfoDto serverInfoDto = new ModelMapper().map(serverInfo, ServerInfoDto.class);
        serverInfoDto.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        serverInfoDto.setCreateBy("Admin");
        serverInfoDto.setModifiedAt(new Timestamp(System.currentTimeMillis()));
        serverInfoDto.setModifiedBy("Admin");

        try{
            ServerInfo createdServerInfo = serverInfoService.create(serverInfoDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdServerInfo);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
