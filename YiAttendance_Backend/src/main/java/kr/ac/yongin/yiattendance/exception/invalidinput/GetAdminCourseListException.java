package kr.ac.yongin.yiattendance.exception.invalidinput;

import kr.ac.yongin.yiattendance.common.ErrorCode;
import kr.ac.yongin.yiattendance.exception.invalidinput.InvalidInputValueException;
import org.springframework.validation.FieldError;

import java.util.List;

public class GetAdminCourseListException extends InvalidInputValueException {
        public GetAdminCourseListException() {
                super(ErrorCode.GET_ADMIN_COURSE_LIST);
        }
        public GetAdminCourseListException(List<FieldError> errors) {
                super(ErrorCode.GET_ADMIN_COURSE_LIST, errors);
        }
}
