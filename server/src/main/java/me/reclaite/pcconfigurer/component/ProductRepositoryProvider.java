package me.reclaite.pcconfigurer.component;

import jakarta.annotation.PostConstruct;
import me.reclaite.pcconfigurer.model.Product;
import me.reclaite.pcconfigurer.model.ProductType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ProductRepositoryProvider {
    
    private final Map<ProductType, CrudRepository<Product, Long>> repositoryMap;
    
    public ProductRepositoryProvider(List<CrudRepository<Product, Long>> repositories) {
        repositoryMap = new HashMap<>();
        repositories.forEach(repository -> {
            Class<?> entityType = getEntityType(repository);
            if (entityType != null) {
                ProductType productType = getProductType(entityType);
                if (productType != null) {
                    repositoryMap.put(productType, repository);
                }
            }
        });
    }
    
    @PostConstruct
    private void initialize() {
        // Проверка, что все необходимые репозитории были найдены
        if (repositoryMap.size() != ProductType.values().length) {
            throw new IllegalStateException("Not all repositories were found for product types");
        }
    }
    
    public CrudRepository<Product, Long> getRepository(ProductType productType) {
        return repositoryMap.get(productType);
    }
    
    private Class<?> getEntityType(CrudRepository<Product, Long> repository) {
        Type[] interfaces = repository.getClass().getGenericInterfaces();
        for (Type type : interfaces) {
            if (type instanceof ParameterizedType parameterizedType) {
                Type[] typeArguments = parameterizedType.getActualTypeArguments();
                if (typeArguments.length >= 1 && typeArguments[0] instanceof Class) {
                    return (Class<?>) typeArguments[0];
                }
            }
        }
        return null;
    }
    
    private ProductType getProductType(Class<?> entityType) {
        try {
            Field enumField = entityType.getDeclaredField("name");
            return ProductType.valueOf(enumField.getName().toUpperCase());
        } catch (NoSuchFieldException | IllegalArgumentException e) {
            return null;
        }
    }
}
