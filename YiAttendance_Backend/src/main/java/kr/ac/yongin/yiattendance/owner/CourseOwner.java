package kr.ac.yongin.yiattendance.owner;


import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;


@Entity
@Getter @Setter @EqualsAndHashCode
@Builder @NoArgsConstructor @AllArgsConstructor
public class CourseOwner {

    @EmbeddedId
    private CourseOwnerPK courseOwnerPK;

    @Length(max = 25)
    private String courseTermId;

    @Length(max = 20)
    private String userName;

    @Enumerated(EnumType.STRING)
    private OwnerType ownerType;

}
