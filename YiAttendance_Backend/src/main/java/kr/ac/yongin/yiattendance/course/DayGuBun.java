package kr.ac.yongin.yiattendance.course;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DayGuBun {
    MONDAY(1, 3510002),
    TUESDAY(2, 3510003),
    WEDNESDAY(3, 3510004),
    THURSDAY(4, 3510005),
    FRIDAY(5,3510006),
    SATURDAY(6, 0),
    SUNDAY(7,0);

    private int dayOfWeekCode;
    private int dayGB;
}
