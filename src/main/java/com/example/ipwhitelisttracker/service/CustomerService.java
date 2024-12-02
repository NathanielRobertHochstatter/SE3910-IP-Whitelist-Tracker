package com.example.ipwhitelisttracker.service;

import com.example.ipwhitelisttracker.model.Account;
import com.example.ipwhitelisttracker.model.ApplicationInfo;
import com.example.ipwhitelisttracker.model.Customer;
import com.example.ipwhitelisttracker.model.Login;
import com.example.ipwhitelisttracker.repository.AccountRepository;
import com.example.ipwhitelisttracker.repository.CustomerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private AccountRepository accountRepository;


    @Transactional
    public Customer create(Customer customer){
        return customerRepo.save(customer);
    }
    @Transactional(readOnly = true)
    public Customer findCustomer(Long id){
        return customerRepo.findById(id).orElseThrow(()->new IllegalArgumentException("Check Id"));
    }

    @Transactional(readOnly = true)
    public List<Customer> findAll(){
        return customerRepo.findAll();
    }

    @Transactional
    public Customer update(Long id, Customer customer){
        Customer customerEntity = customerRepo.findById(id)
                .orElseThrow(()->new IllegalArgumentException("check Id"));  //Persistence Context

//        customerEntity.setName(customer.getName());
//        customerEntity.setPassword(customer.getPassword());
//        customerEntity.setSsn(customer.getSsn());
//        customerEntity.setRole(customer.getRole());
        return customerEntity;
    }// When the transaction end, the persisted data to the database update the database (flush)

    @Transactional
    public String delete(Long id){
        customerRepo.deleteById(id);
        return "ok";
    }

    public boolean validateUserLogin(Customer customer) {
        Customer tmpcustomer = customerRepo.findByUserid(customer.getUserid());


//        System.out.println("login pass " + login.getPassword());
//        System.out.println("database pass " + customer.getPassword());

        if (customer.equals(null)) {
            return false;
        }




        return tmpcustomer.getUser_password().equals(customer.getUser_password());
    }
}
