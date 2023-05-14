package me.reclaite.pcconfigurer.parser;

import me.reclaite.pcconfigurer.parser.impl.DNSParser;
import me.reclaite.pcconfigurer.parser.impl.MVideoParser;

import java.util.function.Function;

public enum ParserType {
    
    DNS(DNSParser::new),
    MVIDEO(MVideoParser::new);

    private final Function<ParserType, Parser> function;

    ParserType(Function<ParserType, Parser> function) {
        this.function = function;
    }

    public Parser getParser() {
        return function.apply(this);
    }

}
