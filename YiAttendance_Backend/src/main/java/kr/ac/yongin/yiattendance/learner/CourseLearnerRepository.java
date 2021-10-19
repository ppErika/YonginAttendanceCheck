package kr.ac.yongin.yiattendance.learner;

import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseLearnerRepository extends JpaRepository<CourseLearner, CourseLearnerPK> {


    //Optional<CourseLearner> findAllByCourseLearnerPK_Course_CourseId (String courseId);

   // @Query("SELECT co FROM CourseOwner co where co.courseOwnerPK.course.courseId= :course_id")

    @Query(value = "SELECT u " +
            "FROM CourseLearner cl, User u  " +
            "WHERE cl.courseLearnerPK.user.userId =u.userId " +
            "AND cl.courseLearnerPK.course.courseId= :course_id"
            )
    List<User> findUsersByCourseId(@Param("course_id")String courseId);

}
