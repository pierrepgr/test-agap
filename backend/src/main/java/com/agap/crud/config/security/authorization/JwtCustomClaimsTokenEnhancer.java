package com.agap.crud.config.security.authorization;

import com.agap.crud.security.SystemUser;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;

public class JwtCustomClaimsTokenEnhancer implements TokenEnhancer {

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        if (authentication.getPrincipal() instanceof SystemUser) {
            var info = new HashMap<String, Object>();
            var systemUser = (SystemUser) authentication.getPrincipal();

            info.put("user_id", systemUser.getUser().getId());
            info.put("full_name", systemUser.getUser().getName());

            var oAuth2AccessToken = (DefaultOAuth2AccessToken) accessToken;
            oAuth2AccessToken.setAdditionalInformation(info);
        }

        return accessToken;
    }
}