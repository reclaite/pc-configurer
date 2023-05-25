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
    
    @Override
    public boolean isCompatible(UserInfo userInfo, Product product) {
        if (product instanceof Motherboard) {
            return ((Motherboard) product).getStorageInterfaces().contains(interfaceType);
        }
        return super.isCompatible(userInfo, product);
    }
}
