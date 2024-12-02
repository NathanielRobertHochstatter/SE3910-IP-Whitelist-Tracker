package com.example.ipwhitelisttracker.service;

import com.example.ipwhitelisttracker.model.ApplicationInfo;
import com.example.ipwhitelisttracker.model.Customer;
import com.example.ipwhitelisttracker.model.CustomerApps;
import com.example.ipwhitelisttracker.model.CustomerAppsDto;
import com.example.ipwhitelisttracker.repository.ApplicationInfoRepo;
import com.example.ipwhitelisttracker.repository.CustomerAppsRepo;
import com.example.ipwhitelisttracker.repository.CustomerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CustomerAppsService {
    private final CustomerAppsRepo customerAppsRepo;

    private final ApplicationInfoRepo applicationInfoRepo;

    private final CustomerRepo customerRepo;

    @Transactional
    public CustomerApps create(CustomerAppsDto customerAppsDto){


        ApplicationInfo applicationInfo =  applicationInfoRepo.findById(customerAppsDto.getAppInfoUid()).orElse(null);

        Customer customer = customerRepo.findById(customerAppsDto.getUid()).orElse(null);

        if(customer!= null && applicationInfo!=null) {

            CustomerApps customerApps = new CustomerApps();
            customerApps.setApplicationInfo(applicationInfo);
            customerApps.setCustomer(customer);
            customerApps.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            customerApps.setCreatedBy("Admin");
            customerApps.setModifiedAt(new Timestamp(System.currentTimeMillis()));
            customerApps.setModifiedBy("Admin");

            return customerAppsRepo.save(customerApps);

        }else{
            return new CustomerApps();
        }


    }
    @Transactional(readOnly = true)
    public CustomerApps findCustomerApps(Long id){
        return customerAppsRepo.findById(id).orElseThrow(()->new IllegalArgumentException("Check Id"));
    }

    @Transactional(readOnly = true)
    public List<CustomerApps> findAll(){
        return customerAppsRepo.findAll();
    }

    @Transactional
    public CustomerApps update(Long id, CustomerApps customerApps){
        CustomerApps customerAppsEntity = customerAppsRepo.findById(id)
                .orElseThrow(()->new IllegalArgumentException("check Id"));  //Persistence Context

        customerAppsEntity.setCustomerAppsUid(customerApps.getCustomerAppsUid());
       // customerAppsEntity.setCustomerUid(customerAppsEntity.getCustomerUid());
        customerAppsEntity.setApplicationInfo(customerApps.getApplicationInfo());
        customerAppsEntity.setCreatedAt(customerApps.getCreatedAt());
        customerAppsEntity.setCreatedBy(customerApps.getCreatedBy());
        customerAppsEntity.setModifiedAt(customerApps.getModifiedAt());
        customerAppsEntity.setModifiedBy(customerApps.getModifiedBy());
        return customerAppsEntity;
    }// When the transaction end, the persisted data to the database update the database (flush)

    @Transactional
    public String delete(Long id){
        customerAppsRepo.deleteById(id);
        return "ok";
    }
}
