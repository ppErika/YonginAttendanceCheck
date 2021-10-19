package kr.ac.yongin.yiattendance.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserStatus {
    NORMAL("normal", "사용"),
    SUSPEND("suspend", "일시정지");

    private final String status;
    private final String description;

}
