package com.agap.crud.config.security.authorization;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@Component
@ConfigurationProperties("agap.jwt.keystore")
public class JwtKeyStoreProperties {

    private String path;
    private String password;
    private String keyPairAlias;
}
