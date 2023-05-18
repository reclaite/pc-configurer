package me.reclaite.pcconfigurer.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Storage extends Product {
    
    private Integer capacity;
    
    private String type;
    
    private String interfaceType;
    
    
}
