package kr.ac.yongin.yiattendance.handler;

import kr.ac.yongin.yiattendance.common.ErrorResponse;
import kr.ac.yongin.yiattendance.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler{

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity handleBusinessException(final BusinessException e) {
        log.warn(e.getCode().toString()+": "+e.getMessage());
        return ErrorResponse.toResponseEntity(e);
    }
}
