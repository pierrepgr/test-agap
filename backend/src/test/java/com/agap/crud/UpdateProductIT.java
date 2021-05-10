package com.agap.crud;

import com.agap.crud.model.Product;
import com.agap.crud.service.ProductService;
import com.agap.crud.util.DatabaseCleaner;
import io.restassured.RestAssured;
import io.restassured.authentication.PreemptiveBasicAuthScheme;
import io.restassured.http.ContentType;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.TestPropertySource;

import javax.validation.ConstraintViolationException;
import java.math.BigDecimal;

import static io.restassured.RestAssured.enableLoggingOfRequestAndResponseIfValidationFails;
import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource("/application-test.properties")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UpdateProductIT {

    @LocalServerPort
    private int port;
    private final ProductService productService;
    private final DatabaseCleaner databaseCleaner;

    @BeforeEach
    void setUp() {
        this.databaseCleaner.clearTables();

        enableLoggingOfRequestAndResponseIfValidationFails();
        var authScheme = new PreemptiveBasicAuthScheme();
        authScheme.setUserName("admin");
        authScheme.setPassword("admin");
        RestAssured.authentication = authScheme;
        RestAssured.port = this.port;
        RestAssured.basePath = "/products";
    }

    @Test
    void shouldTestCreationAndUpdatingProductSuccessfully() {
        var newProduct = new Product();
        newProduct.setSku("AAAA1234");
        newProduct.setName("Jacket");
        newProduct.setPrice(BigDecimal.valueOf(100));

        newProduct = this.productService.save(newProduct);

        assertThat(newProduct).isNotNull();
        assertEquals(newProduct.getName(), "Jacket");

        var updateProduct = new Product();
        updateProduct.setSku("AAAA1234");
        updateProduct.setName("Blue Jacket");
        updateProduct.setPrice(BigDecimal.valueOf(100));
        updateProduct = this.productService.update(newProduct.getId(), updateProduct);

        assertEquals(updateProduct.getName(), "Blue Jacket");
    }

    @Test
    void shouldTestFailedProductUpdating_WhenWithoutName() {
        var newProduct = new Product();
        newProduct.setSku("AAAA1234");
        newProduct.setName("Jacket");
        newProduct.setPrice(BigDecimal.valueOf(100));

        newProduct = this.productService.save(newProduct);

        assertThat(newProduct).isNotNull();
        assertEquals(newProduct.getName(), "Jacket");

        var updateProduct = new Product();
        updateProduct.setSku("AAAA1234");
        updateProduct.setPrice(BigDecimal.valueOf(100));

        var id = newProduct.getId();
        assertThrows(ConstraintViolationException.class, () -> {
            this.productService.update(id, updateProduct);
        });
    }

    @Test
    void shouldReturnStatus200_WhenUpdatingExistingProduct() throws JSONException {
        var id = given()
                .header("Content-Type", "application/json")
                .accept(ContentType.JSON)
            .and()
                .body(this.getNewProductJson())
            .when()
                .post()
            .then()
                .statusCode(HttpStatus.CREATED.value())
                .extract().path("id");

        var response = given()
                .header("Content-Type", "application/json")
                .accept(ContentType.JSON)
            .and()
                .body(this.getProductJsonForUpdating())
            .when()
                .put("/" + id)
            .then()
                .extract().response();

        assertEquals(200, response.statusCode());
        assertEquals("Blue Jacket", response.jsonPath().getString("name"));
    }

    private String getNewProductJson() throws JSONException {
        JSONObject requestParams = new JSONObject();
        requestParams.put("sku", "AAAA1234");
        requestParams.put("name", "Jacket");
        requestParams.put("price", BigDecimal.valueOf(100));
        return requestParams.toString();
    }

    private String getProductJsonForUpdating() throws JSONException {
        JSONObject requestParams = new JSONObject();
        requestParams.put("sku", "AAAA1234");
        requestParams.put("name", "Blue Jacket");
        requestParams.put("price", BigDecimal.valueOf(100));
        return requestParams.toString();
    }
}
