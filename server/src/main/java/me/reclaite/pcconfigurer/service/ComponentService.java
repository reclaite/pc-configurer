package me.reclaite.pcconfigurer.service;

import lombok.RequiredArgsConstructor;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.ProductInfo;
import me.reclaite.pcconfigurer.model.ProductType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ComponentService {
    
    private final CPUService cpuService;
    private final CaseService caseService;
    private final CoolerService coolerService;
    private final MemoryService memoryService;
    private final MotherboardService motherboardService;
    private final StorageService storageService;
    private final VideoCardService videoCardService;
    
    public List<Product> getSelectedProducts(Map<ProductType, ProductInfo> selectedTypes) {
        List<Product> products = new ArrayList<>();
        for (Map.Entry<ProductType, ProductInfo> entry : selectedTypes.entrySet()) {
            switch (entry.getKey()) {
                case CPU -> products.add(cpuService.getCpuRepository().findById(entry.getValue().getId()).orElse(null));
                case COOLER ->
                    products.add(coolerService.getCoolerRepository().findById(entry.getValue().getId()).orElse(null));
                case CASE ->
                    products.add(caseService.getCaseRepository().findById(entry.getValue().getId()).orElse(null));
                case MEMORY ->
                    products.add(memoryService.getMemoryRepository().findById(entry.getValue().getId()).orElse(null));
                case MOTHERBOARD ->
                    products.add(motherboardService.getMotherboardRepository().findById(entry.getValue().getId()).orElse(null));
                case STORAGE ->
                    products.add(storageService.getStorageRepository().findById(entry.getValue().getId()).orElse(null));
                case VIDEOCARD ->
                    products.add(videoCardService.getVideoCardRepository().findById(entry.getValue().getId()).orElse(null));
            }
        }
        return products;
    }
    
}
