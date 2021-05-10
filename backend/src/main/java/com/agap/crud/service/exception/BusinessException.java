package com.agap.crud.service.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public class BusinessException extends RuntimeException {

    private static final long serialVersionUID = 1131228335966316413L;

    private final String code;
    private final HttpStatus status;
    private final String value;
}
