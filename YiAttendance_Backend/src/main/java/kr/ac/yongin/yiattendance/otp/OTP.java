package kr.ac.yongin.yiattendance.otp;

import kr.ac.yongin.yiattendance.course.Course;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter @EqualsAndHashCode
@Builder @NoArgsConstructor @AllArgsConstructor
public class OTP {

    @Id @GeneratedValue
    private Long otpId;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Length(max=10)
    private String OtpNumber;

    private Date expire;
}
