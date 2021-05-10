package com.agap.crud.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class SystemUser extends User {

    private static final long serialVersionUID = 3424557184683862161L;

    private com.agap.crud.model.User user;

    public SystemUser(com.agap.crud.model.User user, Collection<? extends GrantedAuthority> authorities) {
        super(user.getEmail(), user.getPassword(), authorities);
        this.user = user;
    }
}
