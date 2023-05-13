package me.reclaite.pcconfigurer.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Motherboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private Double price;
    
    private String socket;
    
    private Integer ramSlots;
    
    @ElementCollection
    @CollectionTable(name = "motherboard_storage_interfaces", joinColumns = @JoinColumn(name = "motherboard_id"))
    @Column(name = "interface")
    private List<String> storageInterfaces;
    
}
