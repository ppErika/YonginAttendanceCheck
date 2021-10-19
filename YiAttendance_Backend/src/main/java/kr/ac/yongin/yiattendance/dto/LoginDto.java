package kr.ac.yongin.yiattendance.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter @Setter @EqualsAndHashCode
@NoArgsConstructor @AllArgsConstructor @Builder
public class LoginDto {

    @NotBlank
    private String userId;
    @NotBlank
    private String password;
    @NotBlank
    private String userType;
}
