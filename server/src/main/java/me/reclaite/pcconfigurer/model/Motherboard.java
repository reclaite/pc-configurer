package me.reclaite.pcconfigurer.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Motherboard extends Product {
    
    private String socket;
    
    private String caseType;
    
    private Integer ramSlots;
    
    private Integer memoryMax;
    
    private String supportedType;
    
    @ElementCollection
    private List<String> storageInterfaces;
    
    @Override
    public boolean isCompatible(UserInfo userInfo, Product product) {
        if (product instanceof CPU) {
            return socket.equals(((CPU) product).getSocket());
        }
        
        if (product instanceof ComputerCase) {
            return caseType.equals(((ComputerCase) product).getType());
        }
        
        if (product instanceof Memory) {
            return supportedType.equals(((Memory) product).getType());
        }
        
        return super.isCompatible(userInfo, product);
    }
}
