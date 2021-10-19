package kr.ac.yongin.yiattendance.owner;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OwnerType {
    PROFESSOR("prof", "담당교수"),
    ASSOCIATE("associate", "공동교수"),
    ASSIST("assist", "조교");

    private final String code;
    private final String description;
}
