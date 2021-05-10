package com.agap.crud.security;

import com.agap.crud.model.User;
import com.agap.crud.repository.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ApiUserDetailsService implements UserDetailsService {

    private final Users users;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = this.users.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User or password incorrect"));
        return new SystemUser(user, Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
    }
}
