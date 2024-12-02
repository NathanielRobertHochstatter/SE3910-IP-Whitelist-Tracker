package com.example.ipwhitelisttracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class CustomerApps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerAppsUid;

    //Can't do relationship for this attribute until Customer is reworked.

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "uid")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "appInfoUid")
    @JsonIgnore
    private ApplicationInfo applicationInfo;

    private Timestamp createdAt;
    private String createdBy;
    private Timestamp modifiedAt;
    private String modifiedBy;
}
