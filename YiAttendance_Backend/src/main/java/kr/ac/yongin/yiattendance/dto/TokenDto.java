package kr.ac.yongin.yiattendance.dto;

import lombok.*;

@Getter @Setter @EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {

    private String accessToken;
    private String refreshToken;

}
