package me.reclaite.pcconfigurer.parser.impl;

import me.reclaite.pcconfigurer.parser.ParsedProductInfo;
import me.reclaite.pcconfigurer.parser.Parser;
import me.reclaite.pcconfigurer.parser.ParserType;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class DNSParser extends Parser {
    
    public DNSParser(ParserType parserType) {
        super(parserType);
    }
    
    @Override
    public Map<String, String> getMatchedProducts(String productName) {
        HashMap<String, String> products = new HashMap<>();
        
        String url = "https://www.dns-shop.ru/search/?q=" + productName.replace(" ", "+");
        try {
            Document doc = Jsoup.connect(url).followRedirects(true).get();
            Elements selectedElements = doc.body().select("div.catalog-product");
            
            for (Element product : selectedElements) {
                String title = product.select("a.catalog-product__name.span").text();
                String link = "https://www.dns-shop.ru" + product.select("a.catalog-product__name").attr("href");
                products.put(title, link);
            }
            
        } catch (IOException exception) {
            return null;
        }
        return products;
    }
    
    @Override
    public ParsedProductInfo getProductInfo(String productUrl) {
        try {
            Document doc = Jsoup.connect(productUrl).get();
            
            String title = doc.select("div.product-card-top__name").text();
            String price = doc.select("div.product-buy__price").text();
            
            price = price
                .replace("₽", "")
                .replace(" ", "");
            
            return new ParsedProductInfo(title, Double.parseDouble(price));
        } catch (IOException ignored) {
            return new ParsedProductInfo("%Error%", 0D);
        }
    }
}
