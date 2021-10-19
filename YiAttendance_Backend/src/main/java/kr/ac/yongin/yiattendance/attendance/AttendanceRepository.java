package kr.ac.yongin.yiattendance.attendance;

import kr.ac.yongin.yiattendance.corclass.CorClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Column;
import java.util.List;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    public List<Attendance> findAllByCorClassClassId(Long classId);
    @Query("SELECT cc FROM Attendance atd JOIN CorClass cc ON atd.corClass.classId = cc.classId WHERE atd.atdId=:atd_id")
    public CorClass findCorClassByAtdId(@Param("atd_id")Long atdId);

    //@Query(value = "select a from Attendance a, CorClass cc where a.user.userId=:user_id and a.corClass.course.courseId =cc.course.courseId and a.corClass.course.courseId=:course_id")
    //public List<Attendance> getStudentAttendanceByCourseId(@Param("course_id") String courseId,@Param("user_id") String userId);


    @Query(value = "select a from Attendance a where a.user.userId=:user_id and a.corClass.course.courseId=:course_id")
    public List<Attendance> getStudentAttendanceByCourseId(@Param("course_id") String courseId,@Param("user_id") String userId);


    @Query(value = "select cc from Attendance a,CorClass cc where a.user.userId=:user_id and a.corClass.course.courseId=:course_id and a.corClass.course.courseId =cc.course.courseId")
    public List<CorClass> getStudentCorClassByUserId(@Param("course_id") String courseId, @Param("user_id") String userId);

    @Query(value = "select a from Attendance a, CorClass cc " +
            "where cc.user.userId=:user_id " +
            "and a.corClass.course.courseId=:course_id")
    public List<Attendance> getProfAttendanceByCourseId(@Param("course_id") String courseId,@Param("user_id") String userId);


    @Query(value = "select cc from Attendance a, CorClass cc " +
            "where cc.user.userId=:user_id " +
            "and a.corClass.course.courseId=:course_id")
    public List<CorClass> getProfCorClassByCourseId(@Param("course_id") String courseId,@Param("user_id") String userId);


}
