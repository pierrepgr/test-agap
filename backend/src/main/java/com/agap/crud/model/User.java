package com.agap.crud.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {

    private static final long serialVersionUID = -3217655550925287845L;

    @NotBlank(message = "user-1")
    @Size(max = 150, message = "user-1.1")
    private String name;
    @Email(message = "user-2")
    @NotBlank(message = "user-2.1")
    @Size(max = 100, message = "user-2.2")
    private String email;
    private String password;
}
