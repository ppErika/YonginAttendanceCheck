package kr.ac.yongin.yiattendance.exception.authentication;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.authentication.AuthenticationException;
import org.springframework.validation.FieldError;

import java.util.List;

public class AccessDeniedException extends AuthenticationException {
    public AccessDeniedException() {
        super(ErrorCode.ACCESS_DENIED);
    }
    public AccessDeniedException(List<FieldError> errors) {
        super(ErrorCode.ACCESS_DENIED, errors);
    }
}
