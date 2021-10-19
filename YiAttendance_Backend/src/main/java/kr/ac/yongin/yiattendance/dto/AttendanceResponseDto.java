package kr.ac.yongin.yiattendance.dto;


import kr.ac.yongin.yiattendance.attendance.Attendance;
import kr.ac.yongin.yiattendance.corclass.CorClass;
import kr.ac.yongin.yiattendance.user.User;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter @Setter @EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor @Builder
public class AttendanceResponseDto {

    //객체 자체
    Attendance attendance;

    //학생
    private int week;
    private int round;
    Date sessionDate;
    String status;


    //교수용 추가
    int total;
    int normal;
    int absent;
    int late;



}
