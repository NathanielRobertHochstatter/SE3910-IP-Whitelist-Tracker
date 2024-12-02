package com.example.ipwhitelisttracker.repository;

import com.example.ipwhitelisttracker.model.Customer;
import com.example.ipwhitelisttracker.model.CustomerApps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {

        Customer findByUserid(String userid);

}
