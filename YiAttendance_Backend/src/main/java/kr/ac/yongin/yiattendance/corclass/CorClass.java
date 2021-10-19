package kr.ac.yongin.yiattendance.corclass;

import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.user.User;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "classId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class CorClass {
    @Id
    @GeneratedValue
    private Long classId;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDateTime sessionDate;

    private int week;
    private int round;
    @Length(max=10)
    private String status;
    // TODO: 2021-09-02 status Enum으로 변경하기




}
