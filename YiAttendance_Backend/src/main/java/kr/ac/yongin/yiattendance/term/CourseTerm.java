package kr.ac.yongin.yiattendance.term;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Getter @Setter @EqualsAndHashCode(of = "courseTermId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class CourseTerm {

    @Id
    @Length(max = 25)
    private String courseTermId;

    @Length(max = 100)
    private String courseTermName;

    private LocalDate startDate;
    private LocalDate endDate;

    @Length(max = 25)
    private String courseTermType;
}
