package kr.ac.yongin.yiattendance.exception.invalidinput;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.invalidinput.InvalidInputValueException;
import org.springframework.validation.FieldError;

import java.util.List;

public class InputValidationFailedException extends InvalidInputValueException {
    public InputValidationFailedException() {
        super(ErrorCode.INPUT_VALIDATION_FAILED);
    }
    public InputValidationFailedException(List<FieldError> errors) {
        super(ErrorCode.INPUT_VALIDATION_FAILED, errors);
    }
}
