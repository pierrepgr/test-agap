package com.agap.crud.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseEntity {

    private static final long serialVersionUID = 3555136631264964410L;

    @Size(min = 8, max = 12, message = "product-1")
    @NotBlank(message = "product-1.1")
    private String sku;
    @Size(max = 200, message = "product-2")
    @NotBlank(message = "product-2.1")
    private String name;
    @NotNull(message = "product-3.1")
    @DecimalMin(value = "0", message = "product-3")
    private BigDecimal price;
    private boolean deleted;
}
