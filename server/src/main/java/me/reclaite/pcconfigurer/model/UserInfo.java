package me.reclaite.pcconfigurer.model;

import lombok.Data;

import java.util.Map;

@Data
public class UserInfo {
    
    private Map<ProductType, ProductInfo> selected;
    
}