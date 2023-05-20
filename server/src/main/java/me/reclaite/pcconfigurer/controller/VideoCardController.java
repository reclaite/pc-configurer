package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.VideoCard;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.UserInfo;
import me.reclaite.pcconfigurer.service.VideoCardService;
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
@RequestMapping("/videocard")
@RequiredArgsConstructor
public class VideoCardController {
    
    private final ComponentService componentService;
    private final VideoCardService videoCardService;
    
    @GetMapping
    public List<VideoCard> getAllVideoCards() {
        return videoCardService.getVideoCardRepository().findAll();
    }
    
    @GetMapping("/filtered")
    public List<VideoCard> getFilteredVideoCards(@RequestBody UserInfo userInfo) {
        List<Product> products = componentService.getSelectedProducts(userInfo.getSelected());
        return videoCardService.getVideoCardRepository().findAll().stream().filter(
            videoCard -> {
                for (Product product : products) {
                    if (product.isCompatible(videoCard)) {
                        return false;
                    }
                }
                return true;
            }
        ).collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public VideoCard getVideoCardById(@PathVariable Long id) {
        return videoCardService.getVideoCardRepository().findById(id).orElseThrow(() -> new ResourceNotFoundException("VideoCard not found with id " + id));
    }
    
    @PostMapping
    public VideoCard createVideoCard(@RequestBody VideoCard cpu) {
        return videoCardService.getVideoCardRepository().save(cpu);
    }
    
    @PutMapping("/{id}")
    public VideoCard updateVideoCard(@PathVariable Long id, @RequestBody VideoCard cpuDetails) {
        return videoCardService.updateVideoCard(id, cpuDetails);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideoCard(@PathVariable Long id) {
        try {
            videoCardService.deleteVideoCard(id);
        } catch (ResourceNotFoundException exception) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
