package kr.ac.yongin.yiattendance.user;

import kr.ac.yongin.yiattendance.common.BaseTest;
import kr.ac.yongin.yiattendance.department.DepartmentRepository;
import kr.ac.yongin.yiattendance.dto.LoginDto;
import kr.ac.yongin.yiattendance.dto.TokenDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class UserControllerTest extends BaseTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DepartmentRepository departmentRepository;

/*

    //DB로그인 테스트
    @Test
    @DisplayName("정상적인 로그인")
    public void login() throws Exception{
        // Given
        String id = "user";
        String password = "pass";


        LoginDto request = LoginDto.builder()
                .userId(id)
                .password(password)
                .build();

        sampleDataCreator.generateUsrUsers(id, password, UserType.STUDENT);
        // When&Then
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
                .andDo(print())
                .andExpect(status().isOk()); //badcredentialexception 처리 필요

    }
*/



    //LMS로그인 테스트
    @Test
    @DisplayName("LMS로그인 정상")
    public void login() throws Exception{
        // Given
        String id = "tester"; //실제 LMS 아이디
        String password = "pass"; //실제 LMS 비밀번호


        LoginDto request = LoginDto.builder()
                .userType("1")
                .userId(id)
                .password(password)
                .build();

        sampleDataCreator.generateUsrUsers(id, password, UserType.STUDENT);
        // When&Then
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
                .andDo(print())
                .andExpect(status().isOk()); //badcredentialexception 처리 필요

    }


    //LMS로그인 실패 테스트
    @Test
    @DisplayName("LMS로그인 비밀번호 틀림")
    public void loginFailed() throws Exception{
        // Given
        String id = "qwewqe";
        String password = "qewqeqwe";


        LoginDto request = LoginDto.builder()
                .userType("1")
                .userId(id)
                .password(password)
                .build();

        sampleDataCreator.generateUsrUsers(id, password, UserType.STUDENT);
        // When&Then
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
                .andDo(print())
                .andExpect(status().isUnauthorized()); //badcredentialexception 처리 필요

    }


    @Test
    @DisplayName("인증 서버에서는 통과했지만 동기화되지 않은 사용자")
    public void login_not_synced() throws Exception{
        // Given
        LoginDto loginDto = LoginDto.builder()
                        .userType("1")
                                .userId("teststd")
                                        .password("pass")
                                                .build();

        // When & Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("code").value("USR002"))
                ;
    }



    //로그인한 사용자 정보 조회
    //LMS 동기화 테스트 완료
    @Test
    @DisplayName("로그인한 사용자 정보 조회")
    public void getMyInfo() throws Exception{

        // Given
        User User = sampleDataCreator.generateUsrUsers("tester", "pass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(User);

        // When&Then
        mockMvc.perform(get("/api/auth/me")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("userId").exists())
        ; //badcredentialexception 처리 필요

    }


    //LMS 토큰 재발급
    @Test
    @DisplayName("토큰 재발급")
    public void reissue() throws Exception{
        // Given
        User User = sampleDataCreator.generateUsrUsers("tester", "pass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(User);

        // When&Then
        mockMvc.perform(post("/api/auth/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(token))
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("accessToken").exists());
        ; //badcredentialexception 처리 필요


    }

    @Test
    @DisplayName("로그아웃된 사용자가 토큰 재발급 시도")
    public void reissue_logout() throws Exception{
        // Given
        User User = sampleDataCreator.generateUsrUsers("tester", "pass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(User);

        // When&Then
        mockMvc.perform(delete("/api/auth/logout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(token))
                )
                .andDo(
                        result -> mockMvc.perform(post("/api/auth/token")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(objectMapper.writeValueAsString(token))
                                )
                                .andDo(print())
                                .andExpect(status().isUnauthorized())
                )
        ;


    }

    @Test
    @DisplayName("정상적인 로그아웃")
    public void logout() throws Exception{
        // Given
        User User = sampleDataCreator.generateUsrUsers("tester", "pass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(User);

        // When&Then
        mockMvc.perform(delete("/api/auth/logout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(token))
                )
                .andDo(print())
                .andExpect(status().isNoContent())
        ;


    }


/*


    // 로그인 실패(비밀번호 틀림)
    @Test
    @DisplayName("잘못된 비밀번호로 로그인")
    public void login_WrongPassword() throws Exception{
        // Given
        String id = "user";
        String password = "password";

        LoginDto request = LoginDto.builder()
                .userId(id)
                .password("1")
                .build();

        sampleDataCreator.generateUsrUsers(id, password, UserType.STUDENT);
        // When&Then
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
                .andDo(print())
                .andExpect(status().isUnauthorized()); //badcredentialexception 처리 필요


    }

    // 로그인 실패(비밀번호 공백)
    @Test
    @DisplayName("비밀번호 또는 아이디 없는 로그인")
    public void login_wrongPassword() throws Exception{
        // Given
        String id = "user";
        String password = "password";

        LoginDto request = LoginDto.builder()
                .userId(id)
                .password(" ")
                .build();

        sampleDataCreator.generateUsrUsers(id, password, UserType.STUDENT);
        // When&Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andDo(print())
                .andExpect(status().isBadRequest()); //badcredentialexception 처리 필요


    }


    //로그인한 사용자 정보 조회
    // 테스트 돌때마다 로그인 새로 처리되어 토큰이 유지되지 않아 계속 실패, 포스트맨으로 확인 완료
    @Test
    @DisplayName("로그인한 사용자 정보 조회")
    public void getMyInfo() throws Exception{
        // Given
        User user = sampleDataCreator.generateUsrUsers("", "", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(user);

        // When&Then
        mockMvc.perform(get("/api/auth/me")
               .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("userId").exists())
        ; //badcredentialexception 처리 필요

    }


    //학생 요청
    @Test
    @DisplayName("학생 사용자 정보 조회")
    public void getMyInfoStudent() throws Exception{
        // Given
        User user = sampleDataCreator.generateUsrUsers("tester", "testpass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(user);

        // When&Then
        mockMvc.perform(get("/api/auth/studentme")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("userId").exists())
        ; //badcredentialexception 처리 필요

    }


    //학생요청이나 로그인한 사용자는 교수
    @Test
    @DisplayName("교수 사용자가 학생용 URL 요청")
    public void getMyInfoStudentWrong() throws Exception{
        // Given
        User user = sampleDataCreator.generateUsrUsers("tester", "testpass", UserType.PROFESSOR);
        TokenDto token = sampleDataCreator.getToken(user);

        // When&Then
        mockMvc.perform(get("/api/auth/studentme")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
        )
                .andDo(print())
                .andExpect(status().isForbidden());
               // .andExpect(jsonPath("userId").exists())
        ; //badcredentialexception 처리 필요

    }



    //교수 요청
    @Test
    @DisplayName("교수 사용자 정보 조회")
    public void getMyInfoProf() throws Exception{
        // Given
        User user = sampleDataCreator.generateUsrUsers("tester", "testpass", UserType.PROFESSOR);
        TokenDto token = sampleDataCreator.getToken(user);

        // When&Then
        mockMvc.perform(get("/api/auth/profme")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("userId").exists())
        ; //badcredentialexception 처리 필요

    }


    //교수요청이나 로그인한 사용자는 학생
    @Test
    @DisplayName("학생 사용자가 교수용 URL 요청")
    public void getMyInfoProfWrong() throws Exception{
        // Given
        User user = sampleDataCreator.generateUsrUsers("tester", "testpass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(user);

        // When&Then
        mockMvc.perform(get("/api/auth/profme")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
        )
                .andDo(print())
                .andExpect(status().isForbidden());
        // .andExpect(jsonPath("userId").exists())
        ; //badcredentialexception 처리 필요

    }









    //관리자 요청
    @Test
    @DisplayName("관리자 사용자 정보 조회")
    public void getMyInfoAdmin() throws Exception{
        // Given
        User user = sampleDataCreator.generateUsrUsers("tester", "testpass", UserType.ADMIN);
        TokenDto token = sampleDataCreator.getToken(user);

        // When&Then
        mockMvc.perform(get("/api/auth/adminme")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("userId").exists())
        ; //badcredentialexception 처리 필요

    }




    //관리자요청이나 로그인한 사용자는 학생
    @Test
    @DisplayName("학생 사용자가 관리자용 URL 요청")
    public void getMyInfoAdminWrong() throws Exception{
        // Given
        User user = sampleDataCreator.generateUsrUsers("tester", "testpass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(user);

        // When&Then
        mockMvc.perform(get("/api/auth/adminme")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
        )
                .andDo(print())
                .andExpect(status().isForbidden());
        // .andExpect(jsonPath("userId").exists())
        ; //badcredentialexception 처리 필요

    }
*/

/*

    //재발급
    @Test
    @DisplayName("토큰 재발급")
    public void reissue() throws Exception{
        // Given
        User user = sampleDataCreator.generateUsrUsers("tester", "testpass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(user);

        // When&Then
        mockMvc.perform(post("/api/auth/token")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(token))
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("accessToken").exists());
        ; //badcredentialexception 처리 필요


    }
*/

/*
    //재발급 실패
    //설정해둔 RuneTimeException 발생
    @Test
    @DisplayName("토큰 재발급 실패")
    public void reissueFailed() throws Exception{
        // Given
        UsrUsers usrUsers = sampleDataCreator.generateUsrUsers("tester", "testpass", UserType.STUDENT);
        TokenDto token = sampleDataCreator.getToken(usrUsers);
        token.setRefreshToken("1");


        // When&Then
        mockMvc.perform(post("/api/auth/reissue")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+token.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(token))
        )
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("accessToken").exists());
        ; //badcredentialexception 처리 필요
    }*/



    // 로그아웃
}