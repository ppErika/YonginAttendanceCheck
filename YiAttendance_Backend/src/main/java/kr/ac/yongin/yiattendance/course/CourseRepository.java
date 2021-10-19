package kr.ac.yongin.yiattendance.course;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

    @Query("SELECT cc FROM Course cc INNER JOIN CourseLearner cl ON cl.courseLearnerPK.course.courseId = cc.courseId WHERE cl.courseLearnerPK.user.userId = :student_id ")
    List<Course> findCorCourseByStudentId(@Param("student_id")String studentId);

    @Query("SELECT cc FROM Course cc INNER JOIN CourseOwner co ON co.courseOwnerPK.course.courseId = cc.courseId WHERE co.courseOwnerPK.user.userId = :professor_id ")
    List<Course> findCorCourseByProfessorId(@Param("professor_id")String professorId);



}
