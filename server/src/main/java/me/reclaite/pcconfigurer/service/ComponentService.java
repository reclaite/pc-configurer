package me.reclaite.pcconfigurer.service;

import lombok.Getter;
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
    
    @Getter
    private final int pageLimit = 50;
    
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
            final ProductInfo info = entry.getValue();
            switch (entry.getKey()) {
                case CPU -> products.add(cpuService.getCpuRepository().findById(info.getId()).orElse(null));
                case COOLER ->
                    products.add(coolerService.getCoolerRepository().findById(info.getId()).orElse(null));
                case CASE ->
                    products.add(caseService.getCaseRepository().findById(info.getId()).orElse(null));
                case MEMORY ->
                    products.add(memoryService.getMemoryRepository().findById(info.getId()).orElse(null));
                case MOTHERBOARD ->
                    products.add(motherboardService.getMotherboardRepository().findById(info.getId()).orElse(null));
                case STORAGE ->
                    products.add(storageService.getStorageRepository().findById(info.getId()).orElse(null));
                case VIDEOCARD ->
                    products.add(videoCardService.getVideoCardRepository().findById(info.getId()).orElse(null));
            }
        }
        return products;
    }
    
}
