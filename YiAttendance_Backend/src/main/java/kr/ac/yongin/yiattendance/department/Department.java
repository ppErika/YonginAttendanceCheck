package kr.ac.yongin.yiattendance.department;


import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter @Setter @EqualsAndHashCode(of="departmentId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Department {

    @Id
    @Length(max = 25)
    private String departmentId;

    @Length(max = 25)
    private String departmentName;


}
