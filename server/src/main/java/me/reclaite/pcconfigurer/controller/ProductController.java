package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.CPU;
import me.reclaite.pcconfigurer.model.Motherboard;
import me.reclaite.pcconfigurer.repository.MotherboardRepository;
import me.reclaite.pcconfigurer.service.CPUService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    
    private final CPUService cpuService;
    
    private final MotherboardRepository motherboardRepository;
    
    @GetMapping("/cpu")
    public List<CPU> getCPUs() {
        return cpuService.getCpuRepository().findAll();
    }
    
    @GetMapping("/motherboard")
    public List<Motherboard> getMotherboards() {
        return motherboardRepository.findAll();
    }
}
