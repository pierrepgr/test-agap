package com.agap.crud.service.exception;

import org.springframework.http.HttpStatus;

public class EntityAlreadyExistsException extends BusinessException {

    private static final long serialVersionUID = -323057349280277349L;

    public EntityAlreadyExistsException(String errorCode, String value) {
        super(errorCode, HttpStatus.BAD_REQUEST, value);
    }
}
