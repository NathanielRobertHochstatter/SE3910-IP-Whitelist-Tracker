package com.example.ipwhitelisttracker.service;


import com.example.ipwhitelisttracker.dto.ServerInfoDto;
import com.example.ipwhitelisttracker.model.ServerInfo;
import com.example.ipwhitelisttracker.repository.ServerInfoRepo;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServerInfoService {
    private final ServerInfoRepo serverInfoRepo;

    //Add
    @Transactional
    public ServerInfo create(ServerInfoDto serverInfoDto){

        ServerInfo serverInfo = convertToEntity(serverInfoDto);
        return serverInfoRepo.save(serverInfo);
    }
    private ServerInfo convertToEntity(ServerInfoDto serverInfoDto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(serverInfoDto, ServerInfo.class);
    }


    //Get All
    @Transactional(readOnly = true)
    public List<ServerInfo> findAll() {
        return serverInfoRepo.findAll();
    }


    //Search
    @Transactional(readOnly = true)
    public ServerInfo findServerInfo(Long id){
        return serverInfoRepo.findById(id).orElseThrow(()->new IllegalArgumentException("ServerInfo with ID " + id + "not found."));
    }
    //Edit
    @Transactional
    public ServerInfo update(Long id, ServerInfo serverInfo){
        ServerInfo serverInfoEntity = serverInfoRepo.findById(id).orElseThrow(()-> new IllegalArgumentException("ServerInfo with ID " + id + " not found."));
        serverInfoEntity.setServerInfoUid(serverInfo.getServerInfoUid());
        serverInfoEntity.setSourceHostname(serverInfo.getSourceHostname());
        serverInfoEntity.setSourceIpAddress(serverInfo.getSourceIpAddress());
        serverInfoEntity.setDestinationHostName(serverInfo.getDestinationHostName());
        serverInfoEntity.setDestinationIpAddress(serverInfo.getDestinationIpAddress());
        serverInfoEntity.setDestinationPort(serverInfo.getDestinationPort());
        serverInfoEntity.setIpStatus(serverInfo.getIpStatus());
        return serverInfoEntity;
    }

    //Delete
    @Transactional
    public void delete(Long id){
        ServerInfo serverInfo = serverInfoRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("ServerInfo with ID " + " not found."));
        serverInfoRepo.delete(serverInfo);
    }

    //Export IP data to Excel File
    @Transactional
    public void exportToExcel(OutputStream outputStream) throws IOException{
        List<ServerInfo> serverInfoList = serverInfoRepo.findAll();

        //Create excel workbook
        XSSFWorkbook workbook = new XSSFWorkbook();

        //Create excel sheet
        XSSFSheet sheet = workbook.createSheet("Server Info");

        //Create headers
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Server Info UID");
        headerRow.createCell(1).setCellValue("Source Hostname");
        headerRow.createCell(2).setCellValue("Source IP Address");
        //Can add headers as needed

        //Add server info
        int rowNum = 1;
        for (ServerInfo serverInfo : serverInfoList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(serverInfo.getServerInfoUid());
            row.createCell(1).setCellValue(serverInfo.getSourceHostname());
            row.createCell(2).setCellValue(serverInfo.getSourceIpAddress());
            //Can add data as needed
        }
        //Write workboot to output stream
        workbook.write(outputStream);
        workbook.close();
    }

}