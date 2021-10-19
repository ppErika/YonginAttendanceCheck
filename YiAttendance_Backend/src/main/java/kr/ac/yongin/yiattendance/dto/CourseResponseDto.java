package kr.ac.yongin.yiattendance.dto;


import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.owner.CourseOwner;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter @Setter @EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor @Builder
public class CourseResponseDto {

    Course courses;

    List<CourseOwner> courseOwners;

}
