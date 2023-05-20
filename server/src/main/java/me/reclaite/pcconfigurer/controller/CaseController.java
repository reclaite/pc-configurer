package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.Case;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.UserInfo;
import me.reclaite.pcconfigurer.service.CaseService;
import me.reclaite.pcconfigurer.service.ComponentService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/case")
@RequiredArgsConstructor
public class CaseController {
    
    private final ComponentService componentService;
    private final CaseService caseService;
    
    @GetMapping
    public List<Case> getAllCases() {
        return caseService.getCaseRepository().findAll();
    }
    
    @GetMapping("/filtered")
    public List<Case> getFilteredCases(@RequestBody UserInfo userInfo) {
        List<Product> products = componentService.getSelectedProducts(userInfo.getSelected());
        return caseService.getCaseRepository().findAll().stream().filter(
            aCase -> {
                for (Product product : products) {
                    if (product.isCompatible(aCase)) {
                        return false;
                    }
                }
                return true;
            }
        ).collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public Case getCaseById(@PathVariable Long id) {
        return caseService.getCaseRepository().findById(id).orElseThrow(() -> new ResourceNotFoundException("Case not found with id " + id));
    }
    
    @PostMapping
    public Case createCase(@RequestBody Case cpu) {
        return caseService.getCaseRepository().save(cpu);
    }
    
    @PutMapping("/{id}")
    public Case updateCase(@PathVariable Long id, @RequestBody Case cpuDetails) {
        return caseService.updateCase(id, cpuDetails);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCase(@PathVariable Long id) {
        try {
            caseService.deleteCase(id);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
    
}
