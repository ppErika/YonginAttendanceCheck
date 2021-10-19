package kr.ac.yongin.yiattendance.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* Error Codes */
    // Common (COM)
    INPUT_VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "COM001", "Input Value is invalid."),

    // Authorize (AUT)
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "AUT001", "Access is denied."),
    INCORRECT_USER_INFORMATION(HttpStatus.UNAUTHORIZED, "AUT002", "Login information is incorrect."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "AUT003", "The token is invalid or expired."),
    // User:UsrUser (USR)
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USR001", "User is not exist."),
    USER_NOT_SYNCHRONIZATION(HttpStatus.INTERNAL_SERVER_ERROR, "USR002", "Authentication is Successful. But User data is not yet synced."),

    // Course:CorCourse (COR)
    COURSE_NOT_FOUND(HttpStatus.NOT_FOUND, "COR001", "Course is not exist."),
    GET_ADMIN_COURSE_LIST(HttpStatus.BAD_REQUEST, "COR002", "You cannot view the admin's course list."),

    // Class:CorClass (CCL)

    // CourseType:CourseTypeCode (CTC)

    // Department:UsrDepartment (UDP)

    // Learner:ClsLearner (CLN)

    // Otp:OTP (OTP)

    // Owner:CorCourseOwner (CCO)

    // Attendance:Attendance (ATD)
    MULTIPLE_CORCLASS_EXCEPTION(HttpStatus.BAD_REQUEST, "ATD001", "Only one class is allowed per request."),
    ATTENDANCE_NOT_FOUND(HttpStatus.NOT_FOUND,"ATD002", "Attendance is not exist.")

    ;
    /* Fields */
    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

}
