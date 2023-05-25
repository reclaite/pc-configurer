package me.reclaite.pcconfigurer.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@Data
@RequiredArgsConstructor
public class UserInfo {
    
    private Map<String, ProductInfo> selected;
    private ConfigurationType.DTO configurationType;
    
}
