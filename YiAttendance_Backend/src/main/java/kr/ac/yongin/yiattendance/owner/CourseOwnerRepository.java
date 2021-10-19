package kr.ac.yongin.yiattendance.owner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseOwnerRepository extends JpaRepository<CourseOwner, CourseOwnerPK> {

    @Query("SELECT Count(co) " +
            "FROM CourseOwner co " +
            "INNER JOIN Course cc ON co.courseOwnerPK.course.courseId = cc.courseId " +
            "WHERE cc.courseId = :course_id AND co.courseOwnerPK.user.userId = :user_id")
    public Integer isCourseOwner(@Param("course_id")String courseId, @Param("user_id") String userId);

    @Query("SELECT co FROM CourseOwner co where co.courseOwnerPK.course.courseId= :course_id")
    public List<CourseOwner> getProfInfoByCourseId(@Param("course_id")String courseId);

}
