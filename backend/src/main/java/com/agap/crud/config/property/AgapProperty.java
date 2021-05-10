package com.agap.crud.config.property;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties("agap")
public class AgapProperty {

    private String origin;
    private Security security;

    @Getter
    @Setter
    public static class Security {

        private boolean enableHttps;
    }
}
