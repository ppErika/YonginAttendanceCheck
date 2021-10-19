package kr.ac.yongin.yiattendance.user;


import kr.ac.yongin.yiattendance.college.College;
import kr.ac.yongin.yiattendance.department.Department;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;


@Entity @Data
@Getter  @Setter @EqualsAndHashCode(of="userId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    @Length(max = 20)
    private String userId;

    @Length(max = 20)
    private String password;

    @Length(max = 20)
    private String userName;

    @ManyToOne
    @JoinColumn(name="college_id")
    private College collegeId;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department departmentId;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Length(max = 20)
    private String userNo;

    @Length(max = 2)
    private String userGrade;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Length(max = 20)
    private String phoneMobile;

    @Length(max = 30)
    private String phoneEtc;

    @Length(max = 60)
    private String email;
/*
    @Enumerated(EnumType.STRING)
    private UserGender gender;
*/

}
