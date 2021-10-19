package kr.ac.yongin.yiattendance.provider;

import kr.ac.yongin.yiattendance.exception.authentication.IncorrectUserInformationException;
import kr.ac.yongin.yiattendance.exception.other.UserNotSynchronizationException;
import kr.ac.yongin.yiattendance.user.User;
import kr.ac.yongin.yiattendance.user.UserService;
import kr.ac.yongin.yiattendance.user.UserType;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Component
public class YonginAuthServerAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private UserService userService;

    @Value("${yongin.api.auth.login}")
    private String uri;

    @Value("${test.flag}")
    private String testFlag;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String userId = authentication.getName();
        String password = (String) authentication.getCredentials();
        UserType role = (UserType) authentication.getAuthorities().stream().findFirst().get();
        String authUri = String.format(uri, role.getStaffGB(), userId, password);
        String result = "";
        //URI 요청 및 에러 핸들링
        if (testFlag.equals("false")) {
            try{
                URL url = new URL(authUri);
                URLConnection connection = url.openConnection();

                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(),"UTF-8"));

                result = br.readLine();

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e){
                e.printStackTrace();
            }
            if(!result.equals("true")) {
                throw new IncorrectUserInformationException();
            }
        } else {
            // 테스트상태에서는 비밀번호를 pass로 통일
            if (!password.equals("pass")) {
                throw new IncorrectUserInformationException();
            }
        }

        /* DB에서 가져온 정보 */
        Optional<User> user = userService.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotSynchronizationException();
        }
        User currentUser = user.get();
        Collection<GrantedAuthority> userAuthority = new ArrayList<>();
        userAuthority.add(currentUser.getUserType());
        Authentication newAuth = new UsernamePasswordAuthenticationToken(
                authentication.getName(), null, userAuthority);

        return newAuth;
    }

    @Override
    // 위의 authenticate 메소드에서 반환한 객체가 유효한 타입이 맞는지 검사
    // null 값이거나 잘못된 타입을 반환했을 경우 인증 실패로 간주
    public boolean supports(Class<?> aClass) {
        // 스프링 Security가 요구하는 UsernamePasswordAuthenticationToken 타입이 맞는지 확인
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}
