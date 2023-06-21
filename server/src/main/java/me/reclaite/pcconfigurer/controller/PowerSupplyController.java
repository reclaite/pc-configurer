package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.PowerSupply;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.UserInfo;
import me.reclaite.pcconfigurer.service.PowerSupplyService;
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
@RequestMapping("/powersupply")
@RequiredArgsConstructor
public class PowerSupplyController {
    
    private final ComponentService componentService;
    private final PowerSupplyService powerSupplyService;
    
    @GetMapping
    public List<PowerSupply> getAllPowerSupplies() {
        return powerSupplyService.getPowerSupplyRepository().findAll();
    }
    
    @PostMapping("/filtered")
    public List<PowerSupply> getFilteredPowerSupplies(@RequestBody UserInfo userInfo) {
        List<Product> products = componentService.getSelectedProducts(userInfo.getSelected());
        return powerSupplyService.getPowerSupplyRepository().findAll().stream().filter(
            powerSupply -> {
                if (userInfo.getConfigurationType().getName() != powerSupply.getConfigurationType()) {
                    return false;
                }
                for (Product product : products) {
                    if (!product.isCompatible(userInfo, powerSupply)) {
                        return false;
                    }
                }
                return true;
            }
        ).collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public PowerSupply getPowerSupplyById(@PathVariable Long id) {
        return powerSupplyService.getPowerSupplyRepository().findById(id).orElseThrow(() -> new ResourceNotFoundException("PowerSupply not found with id " + id));
    }
    
    @PostMapping
    public PowerSupply createPowerSupply(@RequestBody PowerSupply cpu) {
        return powerSupplyService.getPowerSupplyRepository().save(cpu);
    }
    
    @PutMapping("/{id}")
    public PowerSupply updatePowerSupply(@PathVariable Long id, @RequestBody PowerSupply cpuDetails) {
        return powerSupplyService.updatePowerSupply(id, cpuDetails);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePowerSupply(@PathVariable Long id) {
        try {
            powerSupplyService.deletePowerSupply(id);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
