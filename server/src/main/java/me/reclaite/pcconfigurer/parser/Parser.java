package me.reclaite.pcconfigurer.parser;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@Getter
public abstract class Parser {
    
    private final ParserType parserType;
    
    public Parser(ParserType parserType) {
        this.parserType = parserType;
    }
    
    public abstract Map<String, String> getMatchedProducts(String productName);
    
    public abstract ParsedProductInfo getProductInfo(String productUrl);
    
}
