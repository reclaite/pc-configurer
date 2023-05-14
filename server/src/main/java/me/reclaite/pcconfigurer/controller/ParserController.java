package me.reclaite.pcconfigurer.controller;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.CPU;
import me.reclaite.pcconfigurer.parser.Parser;
import me.reclaite.pcconfigurer.parser.ParserType;
import me.reclaite.pcconfigurer.service.CPUService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/parser")
@RequiredArgsConstructor
public class ParserController {
    
    @Autowired
    private final CPUService cpuService;
    
    @GetMapping("/cpu")
    public Map<String, String> parseCPUs(@RequestParam String name) {
        List<CPU> cpus = new ArrayList<>();
        for (ParserType parserType : ParserType.getTypes()) {
            Parser parser = parserType.getParser();
            Map<String, String> products = parser.getMatchedProducts(name);
            return products;
        }
        return null;
    }
}
