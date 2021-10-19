package kr.ac.yongin.yiattendance.learner;

import kr.ac.yongin.yiattendance.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CourseLearnerService {

    private final CourseLearnerRepository courseLearnerRepository;


    public List<User> findUsersByCourseId(String courseId){
        return courseLearnerRepository.findUsersByCourseId(courseId);
    }
    /*
    public Optional<CourseLearner> findAllByCourseLearnerPK_Course_CourseId(String courseId){
        return courseLearnerRepository.findAllByCourseLearnerPK_Course_CourseId(courseId);
    }
*/

}
