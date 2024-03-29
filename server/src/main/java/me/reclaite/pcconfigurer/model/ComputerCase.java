package me.reclaite.pcconfigurer.model;


import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class ComputerCase extends Product {
    
    private String type;
    
    private String material;
    
}
