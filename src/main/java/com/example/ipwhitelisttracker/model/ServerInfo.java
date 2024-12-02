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
public class ServerInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serverInfoUid; //PK

    //Needs to be checked if right.
    @ManyToOne
    @JoinColumn(name = "appInfoUid")
    @JsonIgnore
    private ApplicationInfo applicationInfo;

    private String sourceHostname;
    private String sourceIpAddress;
    private String destinationHostName;
    private String destinationIpAddress;
    private String destinationPort;
    private String ipStatus;
    private Timestamp createdAt;
    private String createBy;
    private  Timestamp modifiedAt;
    private String modifiedBy;
}
