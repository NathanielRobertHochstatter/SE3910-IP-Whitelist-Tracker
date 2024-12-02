package com.example.ipwhitelisttracker.service;

import com.example.ipwhitelisttracker.model.ApplicationInfo;
import com.example.ipwhitelisttracker.repository.ApplicationInfoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AppService {
    private final ApplicationInfoRepo applicationInfoRepo;

    @Transactional
    public ApplicationInfo create(ApplicationInfo applicationInfo){
        return applicationInfoRepo.save(applicationInfo);
    }
    @Transactional(readOnly = true)
    public ApplicationInfo findApplicationInfo(Long id){
        return applicationInfoRepo.findById(id).orElseThrow(()->new IllegalArgumentException("Check Id"));
    }

    @Transactional(readOnly = true)
    public List<ApplicationInfo> findAll(){
        return applicationInfoRepo.findAll();
    }

    @Transactional
    public ApplicationInfo update(Long id, ApplicationInfo applicationInfo){
        ApplicationInfo applicationInfoEntity= applicationInfoRepo.findById(id)
                .orElseThrow(()->new IllegalArgumentException("check Id"));  //Persistence Context

        applicationInfoEntity.setAppInfoUid(applicationInfo.getAppInfoUid());
        applicationInfoEntity.setAppId(applicationInfo.getAppId());
        applicationInfoEntity.setAppInfoDescription(applicationInfo.getAppInfoDescription());
        applicationInfoEntity.setCreatedAt(applicationInfo.getCreatedAt());
        applicationInfoEntity.setCreatedBy(applicationInfo.getCreatedBy());
        applicationInfoEntity.setModifiedAt(applicationInfo.getModifiedAt());
        applicationInfoEntity.setModifiedBy(applicationInfo.getModifiedBy());
        return applicationInfoEntity;
    }// When the transaction end, the persisted data to the database update the database (flush)

    @Transactional
    public String delete(Long id){
        applicationInfoRepo.deleteById(id);
        return "ok";
    }
}
