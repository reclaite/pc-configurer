package me.reclaite.pcconfigurer.model;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProductInfo {
    
    private Long id;
    
    private ProductType productType;
    
    private List<String> images;
    
    private String title;
    
    private double price;
    
    private Map<String, String> otherSpecifications;
    
}
