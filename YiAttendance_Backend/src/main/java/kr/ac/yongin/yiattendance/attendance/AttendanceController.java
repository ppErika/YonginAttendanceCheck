package kr.ac.yongin.yiattendance.attendance;


import kr.ac.yongin.yiattendance.dto.AttendanceUpdatesRequestDTO;
import kr.ac.yongin.yiattendance.dto.AttendanceResponseDto;
import kr.ac.yongin.yiattendance.exception.invalidinput.InputValidationFailedException;
import kr.ac.yongin.yiattendance.filter.SecurityUtil;
import kr.ac.yongin.yiattendance.user.User;
import kr.ac.yongin.yiattendance.user.UserType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/attendance")
@AllArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

/*

    //개인별 출석체크 사용 X
    @PostMapping("/person")
    @Secured({UserType.Authority.PROFESSOR})
    public ResponseEntity AttendancePerson(@RequestBody @Valid AttendancePersonDto attendancePersonDto, Errors errors) {
        if (errors.hasErrors()) {
            throw new InputValidationFailedException(errors.getFieldErrors());
        }

        User user = User.builder()
                .userId(SecurityUtil.getCurrentMemberId())
                .userType(SecurityUtil.getCurrentUserType())
                .build();

        Attendance attendance = attendanceService.attendancePerson(user,attendancePersonDto);
        return ResponseEntity.created(null).body(attendance);
    }
*/


    /*
    //초기 메소드 사용 X
    @PostMapping("/create")
    @Secured({UserType.Authority.PROFESSOR})
    public ResponseEntity saveAttendance() {

        User user = User.builder()
                .userId(SecurityUtil.getCurrentMemberId())
                .userType(SecurityUtil.getCurrentUserType())
                .build();

        List<Attendance> attendances = attendanceService.saveAttendance(user);
        return ResponseEntity.created(null).body(attendances);
    }*/



    /*@PostMapping("/create")
    @Secured({UserType.Authority.PROFESSOR})
    public ResponseEntity saveAttendance(@RequestBody @Valid List<Attendance> attendances) {

        User user = User.builder()
                .userId(SecurityUtil.getCurrentMemberId())
                .userType(SecurityUtil.getCurrentUserType())
                .build();

        List<Attendance> attendancesSave = attendanceService.createAttendance(user,attendances);
        return ResponseEntity.created(null).body(attendancesSave);
    }*/

    @PatchMapping("/updates")
    @Secured({UserType.Authority.PROFESSOR, UserType.Authority.ADMIN})
    public ResponseEntity updates(@RequestBody @Valid List<AttendanceUpdatesRequestDTO> updatesRequestDTOs,
                                  Errors errors) {
        if (errors.hasErrors()) {
            throw new InputValidationFailedException(errors.getFieldErrors());
        }

        User user = User.builder()
                .userId(SecurityUtil.getCurrentMemberId())
                .userType(SecurityUtil.getCurrentUserType())
                .build();

        attendanceService.updateAttendances(user,updatesRequestDTOs);

        return new ResponseEntity(HttpStatus.OK);

    }

    @GetMapping("/{courseId}")
    public ResponseEntity findUsersByCourseId(@PathVariable String courseId) {
        List<User> users = attendanceService.findUsersByCourseId(courseId);
        return ResponseEntity.ok(users);
    }

    @Secured({UserType.Authority.PROFESSOR, UserType.Authority.ADMIN})
    @GetMapping("/byclass/{classId}")
    public ResponseEntity findAttendancesByCourseId(@PathVariable Long classId) {
        List<Attendance> attendances = attendanceService.findAttendancesByClassId(classId);
        return ResponseEntity.ok().body(attendances);
    }

    @GetMapping("/user/{courseId}")
    public ResponseEntity checkAttendanceStatus(@PathVariable String courseId) {

        User user = User.builder()
                .userId(SecurityUtil.getCurrentMemberId())
                .userType(SecurityUtil.getCurrentUserType())
                .build();

        List<AttendanceResponseDto> attendanceResponseDtos = attendanceService.checkAttendanceStatus(user,courseId);
        return ResponseEntity.ok(attendanceResponseDtos);
    }








}
