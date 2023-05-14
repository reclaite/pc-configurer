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

public class MVideoParser extends Parser {

    public MVideoParser(ParserType parserType) {
        super(parserType);
    }

    @Override
    public Map<String, String> getMatchedProducts(String productName) {
        Map<String, String> products = new HashMap<>();
        try {
            String url = "https://www.mvideo.ru/product-list-page?q=" + productName.replace(" ", "+");
            Document doc = Jsoup.connect(url).get();
            Elements matchedProducts = doc.select("a.product-title__text.product-title--clamp");

            for (Element product : matchedProducts) {
                String title = product.text();
                String link = "https://www.mvideo.ru" + product.attr("href");
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
            String url = "https://www.mvideo.ru/products/materinskaya-plata-msi-h510m-a-pro-30061076";
            Document doc = Jsoup.connect(url).get();

            String title = doc.select("h1.title").text();
            String price = doc.select("div.price__main-value").text();

            price = price
                    .replace("₽", "")
                    .replace(" ", "");

            return new ParsedProductInfo(title, Double.parseDouble(price));
        } catch (IOException exception) {
            return new ParsedProductInfo("%Error%", 0D);
        }
    }
}
