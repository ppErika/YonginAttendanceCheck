package kr.ac.yongin.yiattendance.college;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "CollegeId")
@NoArgsConstructor @AllArgsConstructor @Builder
public class College {
    @Id
    @Length(max = 4)
    String CollegeId;

    @Length(max = 100)
    String CollegeName;
}
