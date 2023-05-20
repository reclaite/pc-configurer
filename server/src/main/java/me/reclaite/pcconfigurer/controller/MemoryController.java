package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.Memory;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.UserInfo;
import me.reclaite.pcconfigurer.service.ComponentService;
import me.reclaite.pcconfigurer.service.MemoryService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/memory")
@RequiredArgsConstructor
public class MemoryController {
    
    private final ComponentService componentService;
    private final MemoryService memoryService;
    
    @GetMapping
    public List<Memory> getAllMemories() {
        return memoryService.getMemoryRepository().findAll();
    }
    
    @PostMapping("/filtered")
    public List<Memory> getFilteredMemories(@RequestBody UserInfo userInfo, @RequestParam Integer page) {
        
        List<Product> products = componentService.getSelectedProducts(userInfo.getSelected());
        return memoryService.getMemoryRepository().findAll().stream().filter(
            memory -> {
                int offset = (page - 1) * componentService.getPageLimit();
                for (Product product : products) {
                    if (offset-- >= 0) {
                        continue;
                    }
                    if (product.isCompatible(memory)) {
                        return false;
                    }
                }
                return true;
            }
        ).collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public Memory getMemoryById(@PathVariable Long id) {
        return memoryService.getMemoryRepository().findById(id).orElseThrow(() -> new ResourceNotFoundException("Memory not found with id " + id));
    }
    
    @PostMapping
    public Memory createMemory(@RequestBody Memory cpu) {
        return memoryService.getMemoryRepository().save(cpu);
    }
    
    @PutMapping("/{id}")
    public Memory updateMemory(@PathVariable Long id, @RequestBody Memory cpuDetails) {
        return memoryService.updateMemory(id, cpuDetails);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMemory(@PathVariable Long id) {
        try {
            memoryService.deleteMemoryEntry(id);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
