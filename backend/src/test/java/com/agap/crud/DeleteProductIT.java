package com.agap.crud;

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

import java.math.BigDecimal;

import static io.restassured.RestAssured.enableLoggingOfRequestAndResponseIfValidationFails;
import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource("/application-test.properties")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DeleteProductIT {

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
    void shouldReturnStatus201_WhenDeletingExistingProduct() throws JSONException {
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
            .when()
                .delete("/products/" + id)
            .then()
                .extract().response();

        assertEquals(404, response.statusCode());
    }

    @Test
    void shouldReturnStatus404_WhenDeletingNonexistentProduct() {
        var response = given()
                .header("Content-Type", "application/json")
                .accept(ContentType.JSON)
            .when()
                .delete("/products/1")
            .then()
                .extract().response();

        assertEquals(404, response.statusCode());
    }

    private String getNewProductJson() throws JSONException {
        JSONObject requestParams = new JSONObject();
        requestParams.put("sku", "AAAA1234");
        requestParams.put("name", "Jacket");
        requestParams.put("price", BigDecimal.valueOf(100));
        return requestParams.toString();
    }
}
