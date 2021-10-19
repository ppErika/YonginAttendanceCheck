package kr.ac.yongin.yiattendance.course;


import kr.ac.yongin.yiattendance.term.CourseTerm;
import kr.ac.yongin.yiattendance.department.Department;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;


@Entity
@Getter @Setter @EqualsAndHashCode(of="courseId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Course {

    @Id
    @Length(max = 25)
    private String courseId;

    @ManyToOne
    @JoinColumn(name = "course_term_id")
    private CourseTerm courseTerm;

    @Length(max = 20)
    private String courseCode;

    @Length(max = 100)
    private String courseName;

    @Length(max = 100)
    private String courseNameEng;

    @Length(max = 8)
    private String courseType;


    private int courseSisu;

    @Length(max = 7)
    private String daygb;

    @Length(max = 100)
    private String daynm;

    @Length(max = 10)
    private String roomcd;

    @Length(max = 112)
    private String roomnm;

    @Length(max = 19)
    private String startcd;

    @Length(max = 100)
    private String starttime;

    @Length(max = 19)
    private String endcd;

    @Length(max = 100)
    private String endtime;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(columnDefinition = "TINYINT", length = 1)
    private byte credit;

    @Enumerated(EnumType.STRING)
    private LearningType learningType;

    @Length(max = 2)
    private String grade;

    @Length(max = 1)
    private String gunType;

    @Length(max = 8)
    private String scoreRateType;


}
