package me.reclaite.pcconfigurer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private Double price;
    
    private Integer capacity;
    
    private String type;
    
    private String interfaceType;
    
    public boolean isCompatible(Motherboard motherboard) {
        return motherboard.getStorageInterfaces().contains(interfaceType);
    }
    
}
