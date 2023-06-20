package me.reclaite.pcconfigurer.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Cooler extends Product {
    
    @ElementCollection
    private List<String> socket;
    
    private Integer rpm;
    
    private Integer noiseLevel;
    
    private Integer radiatorSize;
    
    @Override
    public boolean isCompatible(UserInfo userInfo, Product product) {
        if (product instanceof CPU) {
            return socket.contains(((CPU) product).getSocket());
        }
        
        if (product instanceof Motherboard) {
            return socket.contains(((Motherboard) product).getSocket());
        }
        
        return super.isCompatible(userInfo, product);
    }
}
