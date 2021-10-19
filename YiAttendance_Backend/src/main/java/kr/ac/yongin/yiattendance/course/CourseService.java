package kr.ac.yongin.yiattendance.course;

import kr.ac.yongin.yiattendance.dto.CourseResponseDto;
import kr.ac.yongin.yiattendance.exception.invalidinput.GetAdminCourseListException;
import kr.ac.yongin.yiattendance.exception.entitynotfound.UserNotFoundException;
import kr.ac.yongin.yiattendance.owner.CourseOwner;
import kr.ac.yongin.yiattendance.owner.CourseOwnerService;
import kr.ac.yongin.yiattendance.user.UserType;
import kr.ac.yongin.yiattendance.user.User;
import kr.ac.yongin.yiattendance.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    private final UserService userService;

    private final CourseOwnerService courseOwnerService;

    public Optional<Course> findCourseById(String courseId) {
        return courseRepository.findById(courseId);
    }

    //강의와 담당교수 정보
    public List<CourseResponseDto> getCourseAndOwner(User user){

        List<Course> course;
        List<CourseOwner> courseOwner;
        List<CourseResponseDto> courseResponseDtos = new ArrayList<>();

        // 학생인 경우
        if(user.getUserType() == UserType.STUDENT) {
            course = courseRepository.findCorCourseByStudentId(user.getUserId());
            for(int i=0; i<course.size(); i++){


                courseOwner =courseOwnerService.getProfInfoByCourseId(course.get(i).getCourseId());

                CourseResponseDto courseResponseDto = CourseResponseDto.builder()
                        .courses(course.get(i))
                        .courseOwners(courseOwner)
                        .build();

                courseResponseDtos.add(courseResponseDto);
            }
        }
        // 교수인 경우
        else if(user.getUserType() == UserType.PROFESSOR) {
            course = courseRepository.findCorCourseByProfessorId(user.getUserId());

            for(int i=0; i<course.size(); i++){


                courseOwner =courseOwnerService.getProfInfoByCourseId(course.get(i).getCourseId());

                CourseResponseDto courseResponseDto = CourseResponseDto.builder()
                        .courses(course.get(i))
                        .courseOwners(courseOwner)
                        .build();

                courseResponseDtos.add(courseResponseDto);
            }
        }
        // 관리자인 경우
        else {
            course = courseRepository.findAll();

            for(int i=0; i<course.size(); i++){


                courseOwner =courseOwnerService.getProfInfoByCourseId(course.get(i).getCourseId());

                CourseResponseDto courseResponseDto = CourseResponseDto.builder()
                        .courses(course.get(i))
                        .courseOwners(courseOwner)
                        .build();

                courseResponseDtos.add(courseResponseDto);
            }
        }
        return courseResponseDtos;
    }


    public List<Course> getUserCourse(String userId) {
        User user = userService.getUsrUserById(userId);
        List<Course> result;

        try {
            // 가져올 유저의 타입 파악
            if (user.getUserType() == UserType.STUDENT) {
                result = courseRepository.findCorCourseByStudentId(userId);
            } else if (user.getUserType() == UserType.PROFESSOR) {
                result = courseRepository.findCorCourseByProfessorId(userId);
            } else {
                List<FieldError> fieldErrorList = new ArrayList<>();
                fieldErrorList.add(new FieldError(userId.getClass().getName(), "userId", userId, false, null, null, "User id must not be an admin."));
                throw new GetAdminCourseListException(fieldErrorList);
            }
        } catch (EntityNotFoundException e) {
            List<FieldError> fieldErrorList = new ArrayList<>();
            fieldErrorList.add(new FieldError(userId.getClass().getName(), "userId", userId, false, null, null, "user Id does not exist."));
            throw new UserNotFoundException(fieldErrorList);
        }
        return result;
    }

}
