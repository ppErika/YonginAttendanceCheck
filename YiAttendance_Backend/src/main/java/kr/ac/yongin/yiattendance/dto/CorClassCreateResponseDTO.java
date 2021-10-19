package kr.ac.yongin.yiattendance.dto;

import kr.ac.yongin.yiattendance.attendance.Attendance;
import kr.ac.yongin.yiattendance.corclass.CorClass;
import lombok.*;

import java.util.List;

@Data
@Getter @Setter @EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor @Builder
public class CorClassCreateResponseDTO {
    CorClass corClass;
    List<Attendance> attendances;
}
