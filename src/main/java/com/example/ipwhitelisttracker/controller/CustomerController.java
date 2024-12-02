package com.example.ipwhitelisttracker.controller;

import com.example.ipwhitelisttracker.model.ApplicationInfo;
import com.example.ipwhitelisttracker.model.Customer;
import com.example.ipwhitelisttracker.model.Login;
import com.example.ipwhitelisttracker.repository.CustomerRepo;
import com.example.ipwhitelisttracker.service.CustomerService;
import com.example.ipwhitelisttracker.service.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/jpa")
public class CustomerController {
    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private SecurityService securityService;

    @GetMapping("/customer")
    public List<Customer> getAllCustomer(){
        return customerRepo.findAll();
    }

    @CrossOrigin
    @PostMapping("/customer")
    public ResponseEntity<?> save(@RequestBody Customer customer){


         customer.setCreatedBy("Admin");
         customer.setCreatedAt(new Timestamp(System.currentTimeMillis()));
         customer.setModifiedBy("Admin");
         customer.setModifiedAt(new Timestamp(System.currentTimeMillis()));


//        System.out.println("name " + customer.getName());
//        System.out.println("password " + customer.getPassword());
//        System.out.println("Role " + customer.getRole());
//        System.out.println("ssn " + customer.getSsn());
        return new ResponseEntity<>(customerService.create(customer), HttpStatus.CREATED);

    }

    @CrossOrigin
    @GetMapping("/customer/{id}")
    public ResponseEntity<?> findAll(@PathVariable Long id){

        return new ResponseEntity<>(customerService.findCustomer(id), HttpStatus.OK);
    }
    @CrossOrigin
    @PutMapping("/customer/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Customer customer){
        return new ResponseEntity<>(customerService.update(id, customer), HttpStatus.OK);
    }
    @CrossOrigin
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        return new ResponseEntity<>(customerService.delete(id), HttpStatus.OK);
    }
    /*
    @GetMapping("/customer/{id}")
    public ResponseEntity<Customer> createCustomer(@PathVariable int id){
        Optional<Customer> customer = customerRepo.findById(id);

        if (!customer.isPresent()){
            throw new UserNotFoundException(String.format("ID[%d] not found", id));
        }

        return new ResponseEntity(customer, HttpStatus.OK);

    }
     */

    //    public ResponseEntity<Object> validateUserLogin(@RequestBody Login login) {
    @PostMapping(path = "/login")
    @CrossOrigin
    public ResponseEntity<Map<String,Object>> validateCustomerLogin(@RequestBody Customer customer) {
        System.out.println("Login Server TEST");
        System.out.println(customer.getUserid());
        System.out.println(customer.getUser_password());


        String token = securityService.createToken(customer.getUserid(),(1*1000*10));
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("token", token);

        System.out.println("validation" + customerService.validateUserLogin(customer));

        if (customerService.validateUserLogin(customer)) {
            return ResponseEntity.status(200).body(map);
        }
        return ResponseEntity.status(400).body(null);

    }
}
