package me.reclaite.pcconfigurer.configuration;

import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.repository.CPURepository;
import me.reclaite.pcconfigurer.repository.ComputerCaseRepository;
import me.reclaite.pcconfigurer.repository.CoolerRepository;
import me.reclaite.pcconfigurer.repository.MemoryRepository;
import me.reclaite.pcconfigurer.repository.MotherboardRepository;
import me.reclaite.pcconfigurer.repository.PowerSupplyRepository;
import me.reclaite.pcconfigurer.repository.StorageRepository;
import me.reclaite.pcconfigurer.repository.VideoCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

@Configuration
@ComponentScan("me.reclaite.pcconfigurer.component")
public class RepositoryConfiguration {
    
    @Autowired
    private ComputerCaseRepository computerCaseRepository;
    
    @Autowired
    private CoolerRepository coolerRepository;
    
    @Autowired
    private CPURepository cpuRepository;
    
    @Autowired
    private MemoryRepository memoryRepository;
    
    @Autowired
    private MotherboardRepository motherboardRepository;
    
    @Autowired
    private StorageRepository storageRepository;
    
    @Autowired
    private VideoCardRepository videoCardRepository;
    
    @Autowired
    private PowerSupplyRepository powerSupplyRepository;
    
    @Bean
    public List<JpaRepository<? extends Product, Long>> productRepositories() {
        return Arrays.asList(
            computerCaseRepository,
            coolerRepository,
            cpuRepository,
            memoryRepository,
            motherboardRepository,
            storageRepository,
            videoCardRepository,
            powerSupplyRepository
        );
    }
    
}
