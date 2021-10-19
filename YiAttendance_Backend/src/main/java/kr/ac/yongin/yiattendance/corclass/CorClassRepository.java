package kr.ac.yongin.yiattendance.corclass;

import kr.ac.yongin.yiattendance.course.Course;

import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CorClassRepository extends JpaRepository<CorClass, Long> {

    public Optional<CorClass> findFirstByCourseOrderByWeekDescRoundDesc(Course course);

    @Query(value = "select c.course.courseId from CorClass c where c.classId= :class_id")
    public String getCourseIdByClassId(@Param("class_id") long classId);

    public List<CorClass> findCorClassesByCourse_CourseId(String courseId);
}
