package me.reclaite.pcconfigurer.parser;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Getter
@Service
@RequiredArgsConstructor
public abstract class Parser {
    
    private final ParserType parserType;
    
    public abstract Map<String, String> getMatchedProducts(String productName);
    
    public abstract ParsedProductInfo getProductInfo(String productUrl);
    
}
