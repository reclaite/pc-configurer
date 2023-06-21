package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.CompleteBuild;
import me.reclaite.pcconfigurer.repository.CompleteBuildRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/build")
@RequiredArgsConstructor
public class CompleteBuildController {
    
    private final CompleteBuildRepository repository;
    
    @PostMapping("/save")
    public void save(@RequestBody CompleteBuild completeBuild) {
        repository.save(completeBuild);
    }
    
    @GetMapping("/{id}")
    public CompleteBuild getBuild(@PathVariable String id) {
        return repository.findById(id).orElse(null);
    }
    
}
