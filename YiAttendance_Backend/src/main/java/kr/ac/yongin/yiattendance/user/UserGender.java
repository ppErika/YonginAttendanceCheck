package kr.ac.yongin.yiattendance.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserGender {
    MALE("M","남자"),
    FEMALE("F", "여자");

    private final String code;
    private final String korean;
}
