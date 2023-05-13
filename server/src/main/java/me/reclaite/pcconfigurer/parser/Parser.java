package me.reclaite.pcconfigurer.parser;

import lombok.Getter;

import java.util.Map;

@Getter
public abstract class Parser {
    
    private final ParserType parserType;
    private final String title;
    
    public Parser(ParserType parserType, String title) {
        this.parserType = parserType;
        this.title = title;
    }
    
    public abstract Map<String, String> getMatchedProducts(String productName);
    
    public abstract ParsedProductInfo getProductInfo(String productUrl);
    
}
