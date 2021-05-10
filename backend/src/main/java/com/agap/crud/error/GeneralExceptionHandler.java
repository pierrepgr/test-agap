package com.agap.crud.error;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Locale;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class GeneralExceptionHandler {

    private final ApiExceptionErrorHandler apiExceptionErrorHandler;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception exception, Locale locale) {
        log.error("Error not expected", exception);
        final String errorCode = "error-1";
        final HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        final ErrorResponse errorResponse = ErrorResponse.of(status, apiExceptionErrorHandler.toApiError(errorCode, locale));

        return ResponseEntity.status(status).body(errorResponse);
    }
}
