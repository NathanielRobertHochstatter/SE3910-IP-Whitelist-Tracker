package com.example.ipwhitelisttracker.dto;

import lombok.Data;
import java.sql.Timestamp;


@Data
public class ServerInfoDto {

    private Long appInfoUid;
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
