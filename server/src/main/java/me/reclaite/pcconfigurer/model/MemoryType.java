package me.reclaite.pcconfigurer.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum MemoryType {

    DDR3(new Properties("DDR3")),
    DDR4(new Properties("DDR4")),
    DDR5(new Properties("DDR5"));

    private final Properties properties;

    @Data
    private static class Properties {

        private final String title;

    }
}
