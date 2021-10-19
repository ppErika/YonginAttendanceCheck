package kr.ac.yongin.yiattendance.filter;

import kr.ac.yongin.yiattendance.user.UserType;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
@NoArgsConstructor
public class SecurityUtil {

    public static String getCurrentMemberId() {
        Authentication authentication = getCurrentUserAuthentication();
        return authentication.getName();
    }

    public static UserType getCurrentUserType() {
        Authentication authentication = getCurrentUserAuthentication();
        return UserType.valueOf(authentication.getAuthorities().toArray()[0].toString().substring(5));
    }


    // SecurityContext 에 유저 정보가 저장되는 시점
    // Request 가 들어올 때 JwtFilter 의 doFilter 에서 저장
    private static Authentication getCurrentUserAuthentication() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw  new RuntimeException("Security Context does not contain authentication information.");
        }
        return authentication;
    }
}