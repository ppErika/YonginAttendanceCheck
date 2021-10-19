package kr.ac.yongin.yiattendance.term;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CourseTermService {
    CourseTermRepository courseTermRepository;

    public CourseTerm getById(String courseTermId) {
        return courseTermRepository.getById(courseTermId);
    }
}
