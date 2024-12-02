package com.example.ipwhitelisttracker.repository;


import com.example.ipwhitelisttracker.model.ServerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerInfoRepo extends JpaRepository <ServerInfo, Long> {

}
