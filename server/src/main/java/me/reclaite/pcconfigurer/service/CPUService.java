package me.reclaite.pcconfigurer.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import me.reclaite.pcconfigurer.model.CPU;
import me.reclaite.pcconfigurer.repository.CPURepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Getter
@AllArgsConstructor
public class CPUService {
    
    private final CPURepository cpuRepository;
    
    public CPU createCPU(CPU cpu) {
        return cpuRepository.save(cpu);
    }
    
    public CPU updateCPU(Long id, CPU cpuDetails) {
        CPU cpu = cpuRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CPU not found with id " + id));
        
        cpu.setName(cpuDetails.getName());
        cpu.setPrice(cpuDetails.getPrice());
        cpu.setSocket(cpuDetails.getSocket());
        cpu.setCores(cpuDetails.getCores());
        cpu.setThreads(cpuDetails.getThreads());
        
        return cpuRepository.save(cpu);
    }
    
    public CPU deleteCPU(Long id) {
        CPU cpu = cpuRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CPU not found with id " + id));
        cpuRepository.delete(cpu);
        return cpu;
    }
    
}
