package kr.ac.yongin.yiattendance.exception.other;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.BusinessException;
import org.springframework.validation.FieldError;

import java.util.List;

public class UserNotSynchronizationException extends BusinessException {
    public UserNotSynchronizationException() { this(null); }
    public UserNotSynchronizationException(List<FieldError> errors) { super(ErrorCode.USER_NOT_SYNCHRONIZATION, errors); }

}
