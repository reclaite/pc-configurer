package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.Storage;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.UserInfo;
import me.reclaite.pcconfigurer.service.StorageService;
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
@RequestMapping("/storage")
@RequiredArgsConstructor
public class StorageController {
    
    private final ComponentService componentService;
    private final StorageService storageService;
    
    @GetMapping
    public List<Storage> getAllStorages() {
        return storageService.getStorageRepository().findAll();
    }
    
    @PostMapping("/filtered")
    public List<Storage> getFilteredStorages(@RequestBody UserInfo userInfo) {
        List<Product> products = componentService.getSelectedProducts(userInfo.getSelected());
        return storageService.getStorageRepository().findAll().stream().filter(
            storage -> {
                for (Product product : products) {
                    if (!product.isCompatible(userInfo, storage)) {
                        return false;
                    }
                }
                return true;
            }
        ).collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public Storage getStorageById(@PathVariable Long id) {
        return storageService.getStorageRepository().findById(id).orElseThrow(() -> new ResourceNotFoundException("Storage not found with id " + id));
    }
    
    @PostMapping
    public Storage createStorage(@RequestBody Storage cpu) {
        return storageService.getStorageRepository().save(cpu);
    }
    
    @PutMapping("/{id}")
    public Storage updateStorage(@PathVariable Long id, @RequestBody Storage cpuDetails) {
        return storageService.updateStorage(id, cpuDetails);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStorage(@PathVariable Long id) {
        try {
            storageService.deleteStorage(id);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
