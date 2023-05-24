package me.reclaite.pcconfigurer.model;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ConfigurationType {
    
    OFFICE("Офисные задачи"),
    GRAPHICS("Графические задачи"),
    GAMING("Игровые задачи");
    
    @JsonValue
    private final String title;
    
    private static final ConfigurationType[] TYPES = ConfigurationType.values();
    
    public static ConfigurationType[] getTypes() {
        return TYPES;
    }
    
}
