package kr.ac.yongin.yiattendance.corclass;

import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.dto.CorClassDto;
import kr.ac.yongin.yiattendance.exception.invalidinput.InputValidationFailedException;
import kr.ac.yongin.yiattendance.filter.SecurityUtil;
import kr.ac.yongin.yiattendance.user.UserType;
import kr.ac.yongin.yiattendance.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/class")
@AllArgsConstructor
public class CorClassController {

    private final CorClassService corClassService;

    @PostMapping
    @Secured({UserType.Authority.PROFESSOR, UserType.Authority.ADMIN})
    public ResponseEntity createCorClass(@RequestBody @Valid CorClassDto corClassDto,
                                        Errors errors) {
        if (errors.hasErrors()) {
            throw new InputValidationFailedException(errors.getFieldErrors());
        }

        User user = User.builder()
                .userId(SecurityUtil.getCurrentMemberId())
                .userType(SecurityUtil.getCurrentUserType())
                .build();
        var responseDTO = corClassService.createCorSession(user, corClassDto);
        return ResponseEntity.created(null).body(responseDTO);
    }

    @GetMapping("/{courseId}")
    @Secured({UserType.Authority.PROFESSOR, UserType.Authority.ADMIN})
    public ResponseEntity findCorClassByCourseId(@PathVariable String courseId){
        List<CorClass> corClassList = corClassService.findCourseIdByCorClass(courseId);
        return ResponseEntity.ok().body(corClassList);
    }

    /*
    @GetMapping("/{courseId}")
    public ResponseEntity findFirstByCourseOrderByWeekDescRoundDesc(@PathVariable String courseId){
        System.out.println(courseId);
        CorClass corClass = corClassService.findFirstByCourseOrderByWeekDescRoundDesc(courseId);
        return ResponseEntity.ok(corClass);
    }
    */
/*

    @GetMapping("/getcorclass/{courseId}")
    public ResponseEntity findUsersByCourseId(@PathVariable String courseId){
        Optional<User> users = corClassService.findUsersByCourseId(courseId);

        return ResponseEntity.ok(users);
    }
*/





}
