package kr.ac.yongin.yiattendance.exception;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import lombok.*;
import org.springframework.validation.FieldError;


import java.util.ArrayList;
import java.util.List;

@Getter @Setter @Builder
public class BusinessException extends RuntimeException {

    private ErrorCode code;
    private List<FieldError> errors;

    public BusinessException(ErrorCode code) {
        super(code.getMessage());
        this.code = code;
        errors = new ArrayList<FieldError>();
    }

    public BusinessException(ErrorCode code, List<FieldError> errors) {
        super(code.getMessage());
        this.code = code;
        this.errors = errors;
    }
}
