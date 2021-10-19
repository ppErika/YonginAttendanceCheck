package kr.ac.yongin.yiattendance.exception.invalidinput;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.BusinessException;
import org.springframework.validation.FieldError;

import java.util.List;

public class MultipleCorClassException extends InvalidInputValueException {
    public MultipleCorClassException() {
        super(ErrorCode.MULTIPLE_CORCLASS_EXCEPTION);
    }
    public MultipleCorClassException(List<FieldError> errors) {
        super(ErrorCode.MULTIPLE_CORCLASS_EXCEPTION, errors);
    }
}
