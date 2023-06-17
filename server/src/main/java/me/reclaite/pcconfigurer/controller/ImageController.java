package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.component.ProductRepositoryProvider;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.ProductInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ImageController {
    
    private static final String UPLOAD_DIR = "uploads";
    
    private final ProductRepositoryProvider repositoryProvider;
    
    @PostMapping("/image/get")
    public ResponseEntity<List<byte[]>> getImage(@RequestBody ProductInfo productInfo) {
        Product product = repositoryProvider.getRepository(productInfo.getType()).findById(productInfo.getId()).orElse(null);
        if (product == null) {
            return null;
        }
        
        try {
            List<byte[]> images = new ArrayList<>();
    
            for (String imagePath : product.getImages()) {
                File file = new File(imagePath);
                FileInputStream fis = new FileInputStream(file);
                
                byte[] imageBytes = new byte[(int) file.length()];
                fis.read(imageBytes);
                fis.close();
        
                images.add(imageBytes);
            }
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
        
            return new ResponseEntity<>(images, headers, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/image/upload")
    public ResponseEntity<?> uploadImage(String imageUrl, ProductInfo productInfo) {
        String fileName = String.format("%s.jpg", productInfo.getId());
        String filePath = String.format("%s/%s", UPLOAD_DIR, fileName);
        
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<byte[]> response = restTemplate.getForEntity(imageUrl, byte[].class);
            byte[] imageBytes = response.getBody();
            
            if (imageBytes == null) {
                throw new IOException("Failed to read bytes from image on URL: " + imageUrl);
            }
            
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            
            File imageFile = new File(filePath);
            FileOutputStream fos = new FileOutputStream(imageFile);
            fos.write(imageBytes);
            fos.close();
            
            CrudRepository<Product, Long> repository = repositoryProvider.getRepository(productInfo.getType());
            Product product = repository.findById(productInfo.getId()).orElseThrow(IOException::new);
            List<String> images = product.getImages();
            if (images == null) {
                images = new ArrayList<>();
            }
            images.add(filePath);
            repository.save(product);
    
            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload image.");
        }
    }
}
