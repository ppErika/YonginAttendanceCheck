package kr.ac.yongin.yiattendance.exception.entitynotfound;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import org.springframework.validation.FieldError;

import java.util.List;

public class AttendanceNotFoundException extends EntityNotFoundException {
    public AttendanceNotFoundException() {
        super(ErrorCode.ATTENDANCE_NOT_FOUND);
    }
    public AttendanceNotFoundException(List<FieldError> errors) {
        super(ErrorCode.ATTENDANCE_NOT_FOUND, errors);
    }
}
