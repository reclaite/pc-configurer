package me.reclaite.pcconfigurer.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StorageInterface> storageInterfaces;
    
    @Override
    public boolean isCompatible(Product product) {
        if (product instanceof CPU) {
            return socket.equals(((CPU) product).getSocket());
        }
        
        if (product instanceof ComputerCase) {
            return caseType.equals(((ComputerCase) product).getType());
        }
        
        if (product instanceof Memory) {
            return supportedType.equals(((Memory) product).getType());
        }
        
        return super.isCompatible(product);
    }
}
