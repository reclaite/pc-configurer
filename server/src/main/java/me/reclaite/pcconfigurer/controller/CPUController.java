package me.reclaite.pcconfigurer.controller;

import me.reclaite.pcconfigurer.model.CPU;
import me.reclaite.pcconfigurer.repository.CPURepository;
import org.springframework.beans.factory.annotation.Autowired;
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
public class CPUController {
    @Autowired
    private CPURepository cpuRepository;
    
    @GetMapping
    public List<CPU> getAllCPUs() {
        return cpuRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public CPU getCPUById(@PathVariable Long id) {
        return cpuRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CPU not found with id " + id));
    }
    
    @PostMapping
    public CPU createCPU(@RequestBody CPU cpu) {
        return cpuRepository.save(cpu);
    }
    
    @PutMapping("/{id}")
    public CPU updateCPU(@PathVariable Long id, @RequestBody CPU cpuDetails) {
        CPU cpu = cpuRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CPU not found with id " + id));
        
        cpu.setName(cpuDetails.getName());
        cpu.setPrice(cpuDetails.getPrice());
        cpu.setSocket(cpuDetails.getSocket());
        
        return cpuRepository.save(cpu);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCPU(@PathVariable Long id) {
        CPU cpu = cpuRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CPU not found with id " + id));
        cpuRepository.delete(cpu);
        return ResponseEntity.ok().build();
    }
}
