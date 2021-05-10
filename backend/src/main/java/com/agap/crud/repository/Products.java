package com.agap.crud.repository;

import com.agap.crud.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Products extends JpaRepository<Product, Long> {

    List<Product> findAllByDeletedFalse();
    Optional<Product> findBySkuIgnoreCase(String sku);
    Optional<Product> findByIdAndDeleted(Long id, boolean deleted);
}
