package kr.ac.yongin.yiattendance.exception.entitynotfound;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.BusinessException;
import org.springframework.validation.FieldError;

import java.util.List;

public class EntityNotFoundException extends BusinessException {
    public EntityNotFoundException(ErrorCode code) {super(code);}
    public EntityNotFoundException(ErrorCode code, List<FieldError> errors) {
        super(code, errors);
    }
}
