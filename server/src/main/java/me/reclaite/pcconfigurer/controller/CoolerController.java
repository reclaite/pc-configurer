package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.Cooler;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.UserInfo;
import me.reclaite.pcconfigurer.service.CoolerService;
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
@RequestMapping("/cooler")
@RequiredArgsConstructor
public class CoolerController {
    
    private final ComponentService componentService;
    private final CoolerService coolerService;
    
    @GetMapping
    public List<Cooler> getAllCoolers() {
        return coolerService.getCoolerRepository().findAll();
    }
    
    @PostMapping("/filtered")
    public List<Cooler> getFilteredCoolers(@RequestBody UserInfo userInfo) {
        List<Product> products = componentService.getSelectedProducts(userInfo.getSelected());
        return coolerService.getCoolerRepository().findAll().stream().filter(
            cooler -> {
                for (Product product : products) {
                    if (!product.isCompatible(cooler)) {
                        return false;
                    }
                }
                return true;
            }
        ).collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public Cooler getCoolerById(@PathVariable Long id) {
        return coolerService.getCoolerRepository().findById(id).orElseThrow(() -> new ResourceNotFoundException("Cooler not found with id " + id));
    }
    
    @PostMapping
    public Cooler createCooler(@RequestBody Cooler cpu) {
        return coolerService.getCoolerRepository().save(cpu);
    }
    
    @PutMapping("/{id}")
    public Cooler updateCooler(@PathVariable Long id, @RequestBody Cooler cpuDetails) {
        return coolerService.updateCooler(id, cpuDetails);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCooler(@PathVariable Long id) {
        try {
            coolerService.deleteCooler(id);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
