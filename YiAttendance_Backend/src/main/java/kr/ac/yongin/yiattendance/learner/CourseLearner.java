package kr.ac.yongin.yiattendance.learner;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@Getter @Setter @EqualsAndHashCode(of="learnerId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class CourseLearner {

    @EmbeddedId
    private CourseLearnerPK courseLearnerPK;

    @Length(max = 25)
    private String courseTermId;

    @Length(max = 20)
    private String userName;

    @Length(max = 1)
    private String learnerType;

    @Length(max = 10)
    private String userNo;


    private char learnerStatus;

    @Length(max = 1)
    private String regYn;

    @Length(max = 1)
    private String trainingYn;


    @Length(max = 1)
    private String foreignerYn;


}
