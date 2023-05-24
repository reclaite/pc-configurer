package me.reclaite.pcconfigurer.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Cooler extends Product {
    
    private String socket;
    
    private Integer rpm;
    
    private Integer noiseLevel;
    
    private Integer radiatorSize;
    
    @Override
    public boolean isCompatible(UserInfo userInfo, Product product) {
        if (product instanceof CPU) {
            return socket.equals(((CPU) product).getSocket());
        }
        
        if (product instanceof Motherboard) {
            return socket.equals(((Motherboard) product).getSocket());
        }
        
        return super.isCompatible(userInfo, product);
    }
}
