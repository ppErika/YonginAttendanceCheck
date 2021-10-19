package kr.ac.yongin.yiattendance.course;

import kr.ac.yongin.yiattendance.common.BaseTest;
import kr.ac.yongin.yiattendance.dto.TokenDto;
import kr.ac.yongin.yiattendance.user.UserType;
import kr.ac.yongin.yiattendance.user.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.stream.IntStream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class CourseControllerTest extends BaseTest {

    @Test
    @DisplayName("관리자가 모든 강의 조회")
    public void getCorCourse() throws Exception {

        // Given
        User user = sampleDataCreator.generateUsrUsers("adminid", "pass", UserType.ADMIN);
        TokenDto usrToken = this.sampleDataCreator.getToken(user);
        int courseCnt = 40;
        IntStream.range(0, courseCnt).forEach(n->sampleDataCreator.generateCorCourse(n));

        // When & Then
        this.mockMvc.perform(get("/api/course")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .content(objectMapper.writeValueAsString(user))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].courses").exists())
                .andExpect(jsonPath("$.length()").value(courseCnt))
        ;

    }

    @Test
    @DisplayName("학생이 수강중인 강의 조회")
    public void getCorCourse_Student() throws Exception {
        // Given
        int courseCnt = 17;
        User user = sampleDataCreator.generateUsersWithCourseLearners("stuid",courseCnt);
        //User user = sampleDataCreator.generateLearnerAndOwner("stuid",courseCnt);
        TokenDto usrToken = this.sampleDataCreator.getToken(user);

        // 가짜 데이터들 추가
        sampleDataCreator.generateUsersWithCourseLearners("fake1",5);
        sampleDataCreator.generateUsersWithCourseLearners("fake2",7);

        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fakeprof1", 7);
        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fakeprof2", 3);

        // When & Then
        this.mockMvc.perform(get("/api/course")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .content(objectMapper.writeValueAsString(user)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].courses").exists())
                .andExpect(jsonPath("$.length()").value(courseCnt))
        ;
    }

    @Test
    @DisplayName("교수가 개설중인 강의 조회")
    public void getCorCourse_Professor() throws Exception {
        // Given
        int courseCnt = 6;

        User user = sampleDataCreator.generateUsrUsersWithCorCourseOwner("professor", courseCnt);
        TokenDto usrToken = this.sampleDataCreator.getToken(user);
        // 가짜 데이터들 추가
        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fake1", 7);
        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fake2", 3);

        // When & Then

        this.mockMvc.perform(get("/api/course")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .content(objectMapper.writeValueAsString(user)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].courses").exists())
                .andExpect(jsonPath("$.length()").value(courseCnt))
        ;
    }

    @Test
    @DisplayName("관리자가 학생 한명의 수강목록 조회")
    public void getUserCorCourse_Student() throws Exception {
        // Given
        User admin = sampleDataCreator.generateUsrUsers("adminid", "pass", UserType.ADMIN); // 조회할 관리자
        TokenDto usrToken = this.sampleDataCreator.getToken(admin);
        int courseCtn = 17; // 학생이 수강신청 한 목록
        User student = sampleDataCreator.generateUsersWithCourseLearners("testStu", courseCtn);
        // 가짜 데이터 추가
        sampleDataCreator.generateUsersWithCourseLearners("fake1", 7);
        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fake2", 13);

        // When & Then

        this.mockMvc.perform(get("/api/course/"+student.getUserId())
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .content(objectMapper.writeValueAsString(admin)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].courseId").exists())
                .andExpect(jsonPath("$.length()").value(courseCtn))
                ;
    }
/*

    @Test
    @DisplayName("관리자가 교수 한명의 강의 개설 목록 조회")
    public void getUserCorCourse_Professor() throws Exception {
        // Given
        User admin = sampleDataCreator.generateUsrUsers("adminid", "pass", UserType.ADMIN); // 조회할 관리자
        TokenDto usrToken = this.sampleDataCreator.getToken(admin);
        int courseCtn = 23; // 교수가 강의를 개설한 목록
        User professor = sampleDataCreator.generateUsrUsersWithCorCourseOwner("testPfs", courseCtn);
        // 가짜 데이터 추가
        sampleDataCreator.generateUsersWithCourseLearners("fake1", 6);
        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fake2", 9);

        // When & Then

        this.mockMvc.perform(get("/api/course/"+professor.getUserId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .content(objectMapper.writeValueAsString(admin)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].courseId").exists())
                .andExpect(jsonPath("$.length()").value(courseCtn))
        ;
    }
*/

    @Test
    @DisplayName("권한없는 사용자가 학생의 수강목록 조회")
    public void getUserCorCourse_BadRequest() throws Exception {
        // Given
        User tryStudent = sampleDataCreator.generateUsrUsers("stuid123", "pass", UserType.STUDENT);// 조회 시도하는 학생
        TokenDto usrToken = this.sampleDataCreator.getToken(tryStudent);
        int courseCtn = 18; // 학생이 수강신청 한 목록
        User student = sampleDataCreator.generateUsersWithCourseLearners("testStu", courseCtn);  // 조회될 학생
        // 가짜 데이터 추가
        sampleDataCreator.generateUsersWithCourseLearners("fake1", 3);
        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fake2", 21);

        // When & Then

        this.mockMvc.perform(get("/api/course/"+student.getUserId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .content(objectMapper.writeValueAsString(tryStudent)))
                .andDo(print())
                .andExpect(status().isForbidden())
        ;
    }

    @Test
    @DisplayName("관리자가 관리자를 조회하려 시도")
    public void getUserCorCourse_Admin() throws Exception {
        // Given
        User tryAdmin = sampleDataCreator.generateUsrUsers("admin1", "pass", UserType.ADMIN);// 조회할 관리자
        TokenDto usrToken = this.sampleDataCreator.getToken(tryAdmin);
        User admin = sampleDataCreator.generateUsrUsers("admin2", "pass", UserType.ADMIN);// 조회당할 관리자
        // 가짜 데이터 추가
        sampleDataCreator.generateUsersWithCourseLearners("fake1", 24);
        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fake2", 5);

        // When & Then

        this.mockMvc.perform(get("/api/course/"+admin.getUserId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .content(objectMapper.writeValueAsString(tryAdmin)))
                .andDo(print())
                .andExpect(status().isBadRequest())
        ;
    }

    @Test
    @DisplayName("관리자가 없는 사용자를 조회")
    public void getUserCorCourse_NotExist() throws Exception {
        // Given
        User admin = sampleDataCreator.generateUsrUsers("adminid", "pass", UserType.ADMIN); // 조회할 관리자
        TokenDto usrToken = this.sampleDataCreator.getToken(admin);
        // 가짜 데이터 추가
        sampleDataCreator.generateUsersWithCourseLearners("fake1", 6);
        sampleDataCreator.generateUsrUsersWithCorCourseOwner("fake2", 9);

        // When & Then

        this.mockMvc.perform(get("/api/course/"+999)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .content(objectMapper.writeValueAsString(admin)))
                .andDo(print())
                .andExpect(status().isNotFound())
        ;
    }

}