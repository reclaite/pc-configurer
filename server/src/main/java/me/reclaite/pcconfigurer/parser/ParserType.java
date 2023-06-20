package me.reclaite.pcconfigurer.parser;

import me.reclaite.pcconfigurer.parser.impl.EldoradoParser;

import java.util.function.Function;

public enum ParserType {
    
    ELDORADO(EldoradoParser::new);
    
    private static final ParserType[] TYPES = ParserType.values();
    
    public static ParserType[] getTypes() {
        return TYPES;
    }
    
    private final Function<ParserType, Parser> function;
    
    ParserType(Function<ParserType, Parser> function) {
        this.function = function;
    }
    
    public Parser getParser() {
        return function.apply(this);
    }
    
}
