package kr.ac.yongin.yiattendance.exception.entitynotfound;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.entitynotfound.EntityNotFoundException;
import org.springframework.validation.FieldError;

import java.util.List;

public class UserNotFoundException extends EntityNotFoundException {
    public UserNotFoundException() {
        super(ErrorCode.USER_NOT_FOUND);
    }
    public UserNotFoundException(List<FieldError> errors) {
        super(ErrorCode.USER_NOT_FOUND, errors);
    }
}
