package kr.ac.yongin.yiattendance.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@Getter
@AllArgsConstructor
public enum UserType implements GrantedAuthority {

    STUDENT("student", Authority.STUDENT, 1),
    PROFESSOR("professor", Authority.PROFESSOR, 2),
    ADMIN("admin", Authority.ADMIN, 3);

    private final String userType;
    private final String authority;
    private final int staffGB;

    public static class Authority {
        public static final String ADMIN = "ROLE_ADMIN";
        public static final String PROFESSOR = "ROLE_PROFESSOR";
        public static final String STUDENT = "ROLE_STUDENT";
    }
}