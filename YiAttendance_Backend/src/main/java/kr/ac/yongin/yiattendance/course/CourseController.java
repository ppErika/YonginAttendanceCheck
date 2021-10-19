package kr.ac.yongin.yiattendance.course;


import kr.ac.yongin.yiattendance.filter.SecurityUtil;
import kr.ac.yongin.yiattendance.user.UserType;
import kr.ac.yongin.yiattendance.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/course")
@AllArgsConstructor
public class CourseController {

    private final CourseService courseService;

    /*
    @GetMapping
    @Secured({UserType.Authority.STUDENT, UserType.Authority.PROFESSOR, UserType.Authority.ADMIN})
    public ResponseEntity getCourse(){
        User user = User.builder()
                .userId(SecurityUtil.getCurrentMemberId())
                .userType(SecurityUtil.getCurrentUserType())
                .build();
        return ResponseEntity.ok(courseService.getCourse(user));
    }
    */

    @GetMapping
    @Secured({UserType.Authority.STUDENT, UserType.Authority.PROFESSOR, UserType.Authority.ADMIN})
    public ResponseEntity getCourse(){
        User user = User.builder()
                .userId(SecurityUtil.getCurrentMemberId())
                .userType(SecurityUtil.getCurrentUserType())
                .build();
        return ResponseEntity.ok(courseService.getCourseAndOwner(user));
    }



    @GetMapping("/{userId}")
    @Secured({UserType.Authority.ADMIN})
    public ResponseEntity getEvent(@PathVariable String userId) {
        List<Course> userCourse = courseService.getUserCourse(userId);
       return ResponseEntity.ok(userCourse);
    }

}
