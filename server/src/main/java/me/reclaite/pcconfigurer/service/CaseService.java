package me.reclaite.pcconfigurer.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import me.reclaite.pcconfigurer.model.ComputerCase;
import me.reclaite.pcconfigurer.repository.CaseRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Getter
@AllArgsConstructor
public class CaseService {
    
    private final CaseRepository caseRepository;
    
    public ComputerCase createCase(ComputerCase cpu) {
        return caseRepository.save(cpu);
    }
    
    public ComputerCase updateCase(Long id, ComputerCase computerCaseDetails) {
        ComputerCase updatedComputerCase = caseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Case not found with id " + id));
        
        updatedComputerCase.setTitle(computerCaseDetails.getTitle());
        updatedComputerCase.setPrice(computerCaseDetails.getPrice());
        updatedComputerCase.setMaterial(computerCaseDetails.getMaterial());
        updatedComputerCase.setImages(computerCaseDetails.getImages());
        updatedComputerCase.setOtherSpecifications(computerCaseDetails.getOtherSpecifications());
        
        return caseRepository.save(updatedComputerCase);
    }
    
    public ComputerCase deleteCase(Long id) {
        ComputerCase computerCase = caseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Case not found with id " + id));
        caseRepository.delete(computerCase);
        return computerCase;
    }
    
}
