package kr.ac.yongin.yiattendance.attendance;

import kr.ac.yongin.yiattendance.corclass.CorClass;
import kr.ac.yongin.yiattendance.user.User;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter @EqualsAndHashCode(of="atdId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Attendance {
    @Id @GeneratedValue
    private Long atdId;
    @ManyToOne
    @JoinColumn(name = "session_id")
    private CorClass corClass;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Date atdDate;
    @Length(max=25)
    private String status;
}
