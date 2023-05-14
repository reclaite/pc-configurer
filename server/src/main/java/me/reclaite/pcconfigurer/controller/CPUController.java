package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.CPU;
import me.reclaite.pcconfigurer.service.CPUService;
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

@RestController
@RequestMapping("/cpus")
@RequiredArgsConstructor
public class CPUController {
    
    private final CPUService cpuService;
    
    @GetMapping
    public List<CPU> getAllCPUs() {
        return cpuService.getCpuRepository().findAll();
    }
    
    @GetMapping("/{id}")
    public CPU getCPUById(@PathVariable Long id) {
        return cpuService.getCpuRepository().findById(id).orElseThrow(() -> new ResourceNotFoundException("CPU not found with id " + id));
    }
    
    @PostMapping
    public CPU createCPU(@RequestBody CPU cpu) {
        return cpuService.getCpuRepository().save(cpu);
    }
    
    @PutMapping("/{id}")
    public CPU updateCPU(@PathVariable Long id, @RequestBody CPU cpuDetails) {
        return cpuService.updateCPU(id, cpuDetails);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCPU(@PathVariable Long id) {
        try {
            cpuService.deleteCPU(id);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
