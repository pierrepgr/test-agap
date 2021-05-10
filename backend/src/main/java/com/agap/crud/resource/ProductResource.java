package com.agap.crud.resource;

import com.agap.crud.model.Product;
import com.agap.crud.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProductResource {

    private final ProductService productService;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_READ') and isAuthenticated()")
    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(this.productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> get(@PathVariable Long id) {
        return ResponseEntity.ok(this.productService.get(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Product> create(@Valid @RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.productService.save(product));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Product> update(@PathVariable Long id, @Valid @RequestBody Product product) {
        return ResponseEntity.ok(this.productService.update(id, product));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('SCOPE_DELETE') and hasAuthority('ROLE_ADMIN')")
    public void delete(@PathVariable Long id) {
        this.productService.delete(id);
    }
}
