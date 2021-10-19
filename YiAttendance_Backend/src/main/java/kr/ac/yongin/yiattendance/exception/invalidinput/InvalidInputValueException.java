package kr.ac.yongin.yiattendance.exception.invalidinput;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.BusinessException;
import org.springframework.validation.FieldError;

import java.util.List;

public class InvalidInputValueException extends BusinessException {
    public InvalidInputValueException(ErrorCode code) {
        super(code);
    }
    public InvalidInputValueException(ErrorCode code, List<FieldError> errors) {
        super(code, errors);
    }
}
