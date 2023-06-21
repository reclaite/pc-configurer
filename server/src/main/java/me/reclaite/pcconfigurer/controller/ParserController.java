package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.component.ProductRepositoryProvider;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.ProductType;
import me.reclaite.pcconfigurer.parser.Parser;
import me.reclaite.pcconfigurer.parser.ParserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/parser")
@RequiredArgsConstructor
public class ParserController {
    
    private final ProductRepositoryProvider repositoryProvider;
    
    @GetMapping("/{type}")
    public Product parseCreate(@PathVariable ProductType type, @RequestParam String name) {
        for (ParserType parserType : ParserType.getTypes()) {
            Parser parser = parserType.getParser();
            parser.processParser();
            Map<String, Object> productMap = parser.getMatchedProduct(type, name);
            Product product = parser.createProduct(type, productMap);
    
            JpaRepository<Product, Long> repository = (JpaRepository<Product, Long>) repositoryProvider.getRepository(type);
            repository.save(product);
            
            return product;
        }
        return null;
    }
}
