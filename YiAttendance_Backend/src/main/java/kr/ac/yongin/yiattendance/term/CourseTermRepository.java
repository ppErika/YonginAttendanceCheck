package kr.ac.yongin.yiattendance.term;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseTermRepository extends JpaRepository<CourseTerm, String> {
}
