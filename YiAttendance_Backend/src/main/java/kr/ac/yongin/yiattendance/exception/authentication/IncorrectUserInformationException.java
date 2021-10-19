package kr.ac.yongin.yiattendance.exception.authentication;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.authentication.AuthenticationException;
import org.springframework.validation.FieldError;

import java.util.List;

public class IncorrectUserInformationException extends AuthenticationException {
    public IncorrectUserInformationException() {
        super(ErrorCode.INCORRECT_USER_INFORMATION);
    }
    public IncorrectUserInformationException(List<FieldError> errors) {
        super(ErrorCode.INCORRECT_USER_INFORMATION, errors);
    }
}
