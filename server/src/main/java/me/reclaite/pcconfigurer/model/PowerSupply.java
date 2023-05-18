package me.reclaite.pcconfigurer.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class PowerSupply extends Product {
    
    private Integer wattage;
    
    private String caseType;
    
    @Override
    public boolean isCompatible(Product product) {
        if (product instanceof Case) {
            return caseType.equals(((Case) product).getType());
        }
        
        if (product instanceof Motherboard) {
            return caseType.equals(((Motherboard) product).getCaseType());
        }
        
        return true;
    }
    
}
