package me.reclaite.pcconfigurer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class CPU extends Product {
    
    private String socket;
    
    private Double frequency;
    
    @OneToOne
    private VideoCard integratedGraphics;
    
    private Integer energyConsumption;
    
    private Integer cores;
    
    private Integer threads;
    
    @Override
    public boolean isCompatible(Product product) {
        if (product instanceof Motherboard) {
            return socket.equals(((Motherboard) product).getSocket());
        }
        
        if (product instanceof Cooler) {
            return socket.equals(((Cooler) product).getSocket());
        }
        
        return true;
    }
}