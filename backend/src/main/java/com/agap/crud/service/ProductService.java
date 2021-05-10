package com.agap.crud.service;

import com.agap.crud.model.Product;
import com.agap.crud.repository.Products;
import com.agap.crud.service.exception.BusinessException;
import com.agap.crud.service.exception.EntityAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProductService {

    private final Products products;

    @Transactional(readOnly = true)
    public List<Product> getAll() {
        return this.products.findAllByDeletedFalse();
    }

    @Transactional(readOnly = true)
    public Product get(Long id) {
        return this.products.findByIdAndDeleted(id, false).orElseThrow(() -> new BusinessException("product-4", HttpStatus.NOT_FOUND, id.toString()));
    }

    @Transactional
    public Product save(Product product) {
        this.verifyIfProductExists(product);
        return this.products.save(product);
    }

    @Transactional
    public Product update(Long id, Product product) {
        Product savedProduct = this.products.findByIdAndDeleted(id, false).orElseThrow(() -> new BusinessException("product-4", HttpStatus.NOT_FOUND, id.toString()));

        BeanUtils.copyProperties(product, savedProduct, "id", "creationDateTime");
        this.verifyIfProductExists(savedProduct);
        return this.products.save(savedProduct);
    }

    @Transactional
    public void delete(Long id) {
        Product savedProduct = this.products.findByIdAndDeleted(id, false).orElseThrow(() -> new BusinessException("product-4", HttpStatus.NOT_FOUND, id.toString()));
        savedProduct.setDeleted(true);
        this.products.save(savedProduct);
    }

    private void verifyIfProductExists(final Product product) {
        Optional<Product> productBySku = this.products.findBySkuIgnoreCase(product.getSku());

        if (productBySku.isPresent() && (product.isNew() || this.isUpdatingToADifferentProduct(product, productBySku)))
            throw new EntityAlreadyExistsException("product-5", product.getSku());
    }

    private boolean isUpdatingToADifferentProduct(final Product product, Optional<Product> productBySku) {
        return product.alreadyExists() && !productBySku.get().equals(product);
    }
}
