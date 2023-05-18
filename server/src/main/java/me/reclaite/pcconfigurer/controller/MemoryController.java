package me.reclaite.pcconfigurer.controller;

import me.reclaite.pcconfigurer.model.Memory;
import me.reclaite.pcconfigurer.repository.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/memory")
public class MemoryController {

    @Autowired
    private MemoryRepository memoryRepository;

    @GetMapping
    public List<Memory> getAllMemories() {
        return memoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Memory getMemoryById(@PathVariable Long id) {
        return memoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Memory not found with id " + id));
    }

    @PostMapping
    public Memory createMemory(@RequestBody Memory memory) {
        return memoryRepository.save(memory);
    }

    @PutMapping("/{id}")
    public Memory updateMemory(@PathVariable Long id, @RequestBody Memory memoryDetails) {
        Memory memory = memoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Memory not found with id " + id));

        memory.setTitle(memoryDetails.getTitle());
        memory.setPrice(memoryDetails.getPrice());
        memory.setCapacity(memoryDetails.getCapacity());
        memory.setType(memoryDetails.getType());
        memory.setSpeed(memoryDetails.getSpeed());

        return memoryRepository.save(memory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMemory(@PathVariable Long id) {
        Memory memory = memoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Memory not found with id " + id));
        memoryRepository.delete(memory);
        return ResponseEntity.ok().build();
    }
}
