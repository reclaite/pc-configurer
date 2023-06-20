package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.ProductType;
import me.reclaite.pcconfigurer.parser.Parser;
import me.reclaite.pcconfigurer.parser.ParserType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/parser")
@RequiredArgsConstructor
public class ParserController {
    
    @GetMapping("/{type}")
    public Product parseCreate(@RequestParam ProductType type, @RequestParam String name) {
        for (ParserType parserType : ParserType.getTypes()) {
            Parser parser = parserType.getParser();
            Map<String, Object> productMap = parser.getMatchedProduct(type, name);
            return parser.createProduct(type, productMap);
        }
        return null;
    }
}
