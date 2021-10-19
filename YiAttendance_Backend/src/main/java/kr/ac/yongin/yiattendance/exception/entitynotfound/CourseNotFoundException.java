package kr.ac.yongin.yiattendance.exception.entitynotfound;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.entitynotfound.EntityNotFoundException;
import org.springframework.validation.FieldError;

import java.util.List;

public class CourseNotFoundException extends EntityNotFoundException {
    public CourseNotFoundException() {
        super(ErrorCode.COURSE_NOT_FOUND);
    }
    public CourseNotFoundException(List<FieldError> errors) {
        super(ErrorCode.COURSE_NOT_FOUND, errors);
    }
}
