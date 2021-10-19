package kr.ac.yongin.yiattendance.dto;

import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Getter @Setter @EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor @Builder
public class AttendanceUpdatesRequestDTO {
    private Long attendanceId;
    private String status;
}
