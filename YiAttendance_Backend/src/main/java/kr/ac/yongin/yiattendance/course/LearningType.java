package kr.ac.yongin.yiattendance.course;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LearningType {
    ONLINE("online", "온라인"),
    OFFLINE("offline", "오프라인"),
    MIX("mix", "혼합");

    private final String type;
    private final String description;
}
