package kr.ac.yongin.yiattendance.owner;

import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.user.User;
import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@Getter @Setter @EqualsAndHashCode
@Builder @NoArgsConstructor @AllArgsConstructor
public class CourseOwnerPK implements Serializable {

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
