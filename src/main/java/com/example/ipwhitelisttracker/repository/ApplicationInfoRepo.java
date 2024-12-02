package com.example.ipwhitelisttracker.repository;

import com.example.ipwhitelisttracker.model.ApplicationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationInfoRepo extends JpaRepository<ApplicationInfo, Long> {
}
