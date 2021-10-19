package kr.ac.yongin.yiattendance.exception.authentication;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.authentication.AuthenticationException;
import org.springframework.validation.FieldError;

import java.util.List;

public class InvalidTokenException extends AuthenticationException {
    public InvalidTokenException() {
        super(ErrorCode.INVALID_TOKEN);
    }
    public InvalidTokenException(List<FieldError> errors) {
        super(ErrorCode.INVALID_TOKEN, errors);
    }
}
