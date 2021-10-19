package kr.ac.yongin.yiattendance.user;


import kr.ac.yongin.yiattendance.dto.LoginDto;
import kr.ac.yongin.yiattendance.dto.TokenDto;
import kr.ac.yongin.yiattendance.exception.authentication.InvalidTokenException;
import kr.ac.yongin.yiattendance.exception.entitynotfound.UserNotFoundException;
import kr.ac.yongin.yiattendance.filter.SecurityUtil;
import kr.ac.yongin.yiattendance.provider.TokenProvider;
import kr.ac.yongin.yiattendance.refreshtoken.RefreshToken;
import kr.ac.yongin.yiattendance.refreshtoken.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    /*
    //로그인 메소드
    @Transactional
    public TokenDto login(LoginDto loginDto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUserId(), loginDto.getPassword());

        // 로그인 실패
        if (authenticationToken ==null){
            throw new IncorrectUserInformationException();
        }

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 UserDetailsService 에서 implement한 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .user_id(authentication.getName())
                .token(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenDto;
    }
*/

    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }


    //LMS 동기화 로그인
    @Transactional
    public TokenDto login(LoginDto loginDto) {
        Collection<GrantedAuthority> role = new ArrayList<>();
        if(loginDto.getUserType().equals("1"))  role.add(UserType.STUDENT);
        else if (loginDto.getUserType().equals("2")) role.add(UserType.PROFESSOR);
        else if (loginDto.getUserType().equals("3")) role.add(UserType.ADMIN);
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUserId(), loginDto.getPassword(), role);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        RefreshToken refreshToken = RefreshToken.builder()
                .user_id(authentication.getName())
                .token(tokenDto.getRefreshToken())
                .build();
        refreshTokenRepository.save(refreshToken);
        return tokenDto;

    }




    // 현재 SecurityContext 에 있는 유저 정보 가져오기
    @Transactional(readOnly = true)
    public User getMyInfo() {

        User user = userRepository.getById(SecurityUtil.getCurrentMemberId());

        if (user == null){
            throw new RuntimeException("로그인 정보 없음");
        }

        return user;
    }


    //토큰 재발급
    @Transactional
    public TokenDto reissue(String accessToken, String refreshToken) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new InvalidTokenException();  // 토큰이 유효하지 않음.
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(accessToken);

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken originalRefreshToken = refreshTokenRepository.findById(authentication.getName())
                .orElseThrow(() -> new InvalidTokenException());    // Expired 된 토큰

        // 4. Refresh Token 일치하는지 검사
        if (!originalRefreshToken.getToken().equals(refreshToken)) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
       // originalRefreshToken.setToken(refreshToken);
        originalRefreshToken.setToken(tokenDto.getRefreshToken());
        refreshTokenRepository.save(originalRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    /*//postman 테스트용 회원가입 메소드
   public UsrUsers save(String userid, String password){
        UsrDepartment usrDepartment= UsrDepartment.builder()
                .departmentId("1")
                .departmentName("11")
                .departmentNameEn("111")
                .build();

        usrDepartmentRepository.save(usrDepartment);

        Random createRandom = new Random();

        UsrUsers user = UsrUsers.builder()
                .userId(userid)
                .password("{noop}"+password)
                .userName(userid + "이름")
                .userNameEn(userid + "name")
                .usrDepartmentId(usrDepartment)
                .userType(UserType.ADMIN)
                .userNo(userid)
                .userGrade(Integer.toString(createRandom.nextInt(4) + 1))
                .userStatus("enable")
                .phoneMobile("010-1234-5678")
                .email("email@email.com")
                .build();

        usrUsersRepository.save(user);
        return user;

    }*/

    //userDetail에서 오버라이드한 메소드, 이름은 name이지만 userId 사용
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        User user = userRepository.getById(userId);

        if (user == null){
            throw new UserNotFoundException();
        }

        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new SimpleGrantedAuthority(user.getUserType().getAuthority()));

        UserContext userContext = new UserContext(user,roles);

        return userContext;

    }

    public User getUsrUserById(String userId) {
        User user = userRepository.getById(userId);
        if(user == null){
            throw new UserNotFoundException();
        }
        return user;
    }

    public Optional<User> findById(String userId) {
        return userRepository.findById(userId);
    }

    public void logout(TokenDto tokenDto) {
        String accessToken = tokenDto.getAccessToken();
        String refreshToken = tokenDto.getRefreshToken();

        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new InvalidTokenException();  // 토큰이 유효하지 않음.
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(accessToken);

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken originalRefreshToken = refreshTokenRepository.findById(authentication.getName())
                .orElseThrow(() -> new InvalidTokenException());    // Expired 된 토큰

        // 4. Refresh Token 일치하는지 검사
        if (!originalRefreshToken.getToken().equals(refreshToken)) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. Refresh Token 삭제하여 로그아웃 처리
        refreshTokenRepository.delete(originalRefreshToken);

        return;
    }


}
