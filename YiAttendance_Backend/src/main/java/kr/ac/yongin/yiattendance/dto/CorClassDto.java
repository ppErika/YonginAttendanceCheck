package kr.ac.yongin.yiattendance.dto;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;

@Getter  @Setter  @EqualsAndHashCode
@NoArgsConstructor  @AllArgsConstructor @Builder
public class CorClassDto {
    @NotBlank
    private String courseId;
    @Nullable
    private String week;
    @Nullable
    private String round;
}
