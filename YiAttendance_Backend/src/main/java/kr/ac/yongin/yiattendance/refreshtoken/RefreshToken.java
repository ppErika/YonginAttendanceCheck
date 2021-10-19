package kr.ac.yongin.yiattendance.refreshtoken;

import kr.ac.yongin.yiattendance.user.User;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
@Getter @Setter
@Builder @NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    private String user_id;

    @Length(max = 200)
    private String token;

}
