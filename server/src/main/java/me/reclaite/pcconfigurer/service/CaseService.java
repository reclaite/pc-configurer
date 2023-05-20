package me.reclaite.pcconfigurer.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import me.reclaite.pcconfigurer.model.Case;
import me.reclaite.pcconfigurer.repository.CaseRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Getter
@AllArgsConstructor
public class CaseService {
    
    private final CaseRepository caseRepository;
    
    public Case createCase(Case cpu) {
        return caseRepository.save(cpu);
    }
    
    public Case updateCase(Long id, Case caseDetails) {
        Case updatedCase = caseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Case not found with id " + id));
        
        updatedCase.setTitle(caseDetails.getTitle());
        updatedCase.setPrice(caseDetails.getPrice());
        updatedCase.setMaterial(caseDetails.getMaterial());
        updatedCase.setImages(caseDetails.getImages());
        updatedCase.setOtherSpecifications(caseDetails.getOtherSpecifications());
        
        return caseRepository.save(updatedCase);
    }
    
    public Case deleteCase(Long id) {
        Case aCase = caseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Case not found with id " + id));
        caseRepository.delete(aCase);
        return aCase;
    }
    
}
