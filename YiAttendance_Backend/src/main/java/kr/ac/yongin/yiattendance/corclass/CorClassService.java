package kr.ac.yongin.yiattendance.corclass;

import kr.ac.yongin.yiattendance.attendance.Attendance;
import kr.ac.yongin.yiattendance.attendance.AttendanceService;
import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.course.CourseService;
import kr.ac.yongin.yiattendance.dto.CorClassCreateResponseDTO;
import kr.ac.yongin.yiattendance.term.CourseTerm;
import kr.ac.yongin.yiattendance.dto.CorClassDto;
import kr.ac.yongin.yiattendance.exception.authentication.AccessDeniedException;
import kr.ac.yongin.yiattendance.exception.entitynotfound.CourseNotFoundException;
import kr.ac.yongin.yiattendance.owner.CourseOwnerService;
import kr.ac.yongin.yiattendance.user.User;
import kr.ac.yongin.yiattendance.user.UserType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CorClassService {

    private final CorClassRepository corClassRepository;

    private final CourseOwnerService courseOwnerService;
    private final CourseService courseService;
    private final AttendanceService attendanceService;

    public CorClassCreateResponseDTO createCorSession(User user, CorClassDto corClassDto) throws AccessDeniedException {
        String courseId = corClassDto.getCourseId();
        Optional<Course> course = courseService.findCourseById(courseId);
        if(course.isEmpty()) {
            // 해당 강의가 없다면
            List<FieldError> fieldErrorList = new ArrayList<>();
            FieldError fieldError = new FieldError("Course", "courseId", courseId, false, null, null, "Not exist course.");
            fieldErrorList.add(fieldError);
            throw new CourseNotFoundException();
        } else if (!(user.getUserType() == UserType.ADMIN ||
                    courseOwnerService.isCourseOwner(courseId, user.getUserId()))) {
            // 관리자가 아닌데, 본인 강좌가 아닌 것에 접근한다면
            List<FieldError> fieldErrorList = new ArrayList<>();
            FieldError fieldError = new FieldError("Course", "courseId", courseId, false, null, null, "Not your own course.");
            fieldErrorList.add(fieldError);
            throw new AccessDeniedException(fieldErrorList);
        }

        // 주차 (week)를 구하기 위한 알고리즘
        // 무조건 개학일부터 7일마다 증가 (수업안해도 주차는 흘러감)
        // 일~월 하나의 주차
        CourseTerm courseTerm = course.get().getCourseTerm();
        LocalDate startDate = courseTerm.getStartDate();
        LocalDate createDate = LocalDate.now(); // 출석하는 날짜(기준일)
        Long between;
        between= ChronoUnit.DAYS.between(startDate, createDate) + 1 + startDate.getDayOfWeek().getValue() % 7; // 학기 시작일과 기준일을 비교
        int week = between.intValue()/7+1;
        if(Integer.valueOf(course.get().getDaygb())-3510001<startDate.getDayOfWeek().getValue()) {
            // 첫 개학주에 해당 과목 수업이 없다면
            week --;
        }
        // 차시는 해당 주차에 수업을 했었는지를 파악
        int round = 1;
        Optional<CorClass> lastCorClass = findLastCorClassByCourseId(courseId);
        if(!lastCorClass.isEmpty()){
            // 적어도 한번이라도 수업을 했다면
            CorClass lastCorClassObj = lastCorClass.get();
            int lastWeek = lastCorClassObj.getWeek();
            if(lastWeek == week) {
                // 이번주에 수업을 했다면
                round = lastCorClassObj.getRound()+1;
            }
        }


        CorClass corClass = CorClass.builder()
                .sessionDate(LocalDateTime.now())
                .course(course.get())
                .user(user)
                .week(week)
                .round(round)
                .build();
        corClassRepository.save(corClass);

        List<Attendance> attendances = attendanceService.createAttendance(corClass);// 학생들의 출석을 생성

        CorClassCreateResponseDTO responseDTO = CorClassCreateResponseDTO.builder()
                .corClass(corClass)
                .attendances(attendances)
                .build();
        return responseDTO;

    }

    public Optional<CorClass> findLastCorClassByCourseId(String courseId) {
        Optional<Course> course = courseService.findCourseById(courseId);
        if(course.isEmpty()) {
            // 해당 강의가 없다면
            List<FieldError> fieldErrorList = new ArrayList<>();
            FieldError fieldError = new FieldError("Course", "courseId", courseId, false, null, null, "Not exist course.");
            fieldErrorList.add(fieldError);
            throw new CourseNotFoundException(fieldErrorList);
        }

        // 이번 강의가 몇차시인지 알아본다.
        Optional<CorClass> corClass = corClassRepository.findFirstByCourseOrderByWeekDescRoundDesc(course.get());
        return corClass;
    }




    //classId로 코스 아이디 가져옴
    public String getCourseIdByClassId(long class_id){
        return corClassRepository.getCourseIdByClassId(class_id);
    }


    public Optional<CorClass> getCorClassById(long classId) {
        return corClassRepository.findById(classId);
    }

    // courseId로 모든 corClass 찾기
    public List<CorClass> findCourseIdByCorClass(String courseId) {
        return corClassRepository.findCorClassesByCourse_CourseId(courseId);
    }

}

