package kr.ac.yongin.yiattendance.exception.authentication;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.BusinessException;
import org.springframework.validation.FieldError;

import java.lang.reflect.Field;
import java.util.List;

public class AuthenticationException extends BusinessException {
    public AuthenticationException(ErrorCode code) {
        super(code);
    }
    public AuthenticationException(ErrorCode code, List<FieldError> errors) {
        super(code, errors);
    }
}
