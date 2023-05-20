package me.reclaite.pcconfigurer.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import me.reclaite.pcconfigurer.model.Motherboard;
import me.reclaite.pcconfigurer.repository.MotherboardRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Getter
@AllArgsConstructor
public class MotherboardService {
    
    private final MotherboardRepository motherboardRepository;
    
    public Motherboard createMotherboard(Motherboard cpu) {
        return motherboardRepository.save(cpu);
    }
    
    public Motherboard updateMotherboard(Long id, Motherboard motherboardDetails) {
        Motherboard motherboard = motherboardRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Motherboard not found with id " + id));
        
        motherboard.setTitle(motherboardDetails.getTitle());
        motherboard.setPrice(motherboardDetails.getPrice());
        motherboard.setSocket(motherboardDetails.getSocket());
        motherboard.setCaseType(motherboardDetails.getCaseType());
        motherboard.setMemoryMax(motherboardDetails.getMemoryMax());
        motherboard.setStorageInterfaces(motherboardDetails.getStorageInterfaces());
        motherboard.setSupportedType(motherboardDetails.getSupportedType());
        motherboard.setRamSlots(motherboardDetails.getRamSlots());
        
        return motherboardRepository.save(motherboard);
    }
    
    public Motherboard deleteMotherboard(Long id) {
        Motherboard motherboard = motherboardRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Motherboard not found with id " + id));
        motherboardRepository.delete(motherboard);
        return motherboard;
    }
    
}
