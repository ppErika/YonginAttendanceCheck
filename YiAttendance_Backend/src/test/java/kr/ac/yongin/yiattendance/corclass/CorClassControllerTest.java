package kr.ac.yongin.yiattendance.corclass;

import kr.ac.yongin.yiattendance.common.BaseTest;
import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.dto.CorClassDto;
import kr.ac.yongin.yiattendance.dto.TokenDto;
import kr.ac.yongin.yiattendance.user.UserType;
import kr.ac.yongin.yiattendance.user.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class CorClassControllerTest extends BaseTest {
  /*  @Test
    @DisplayName("교수 사용자가 출석 세션을 개설함")
    public void createCorClass() throws Exception {
        // Given
        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);
        TokenDto usrToken = sampleDataCreator.getToken(professor);

        Course course = sampleDataCreator.generateCorCourse(1);
        sampleDataCreator.generateCorCourseOwner(course, professor);

        CorClassDto request = CorClassDto.builder()
                .courseId(course.getCourseId())
                .build();


        // When & Then
        this.mockMvc.perform(post("/api/class")
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("classId").exists())
                ;

    }*/

    @Test
    @DisplayName("교수가 아닌 학생이 출석 세션을 개설함")
    public void createCorClass_Student() throws Exception {
        // Given
        User student = sampleDataCreator.generateUsrUsers("student", "pass", UserType.STUDENT);
        TokenDto usrToken = this.sampleDataCreator.getToken(student);
        int courseId = 1;
        sampleDataCreator.generateCorCourse(courseId);

        CorClassDto request = CorClassDto.builder()
                .courseId(Integer.toString(courseId))
                .build();


        // When & Then
        this.mockMvc.perform(post("/api/class")
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isForbidden())
        ;

    }

    @Test
    @DisplayName("교수가 다른 교수의 강의에 출석 세션을 개설함")
    public void createCorClass_Professor() throws Exception {
        // Given
        User professor1 = sampleDataCreator.generateUsrUsers("professor1", "pass", UserType.PROFESSOR);    // 세션개설자
        TokenDto usrToken = this.sampleDataCreator.getToken(professor1);
        User professor2 = sampleDataCreator.generateUsrUsers("professor2", "pass", UserType.PROFESSOR);    // 강의소유자
        int courseId = 1;
        Course course = sampleDataCreator.generateCorCourse(courseId);
        sampleDataCreator.generateCorCourseOwner(course, professor2);

        CorClassDto request = CorClassDto.builder()
                .courseId(Integer.toString(courseId))
                .build();


        // When & Then
        this.mockMvc.perform(post("/api/class")
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isForbidden())
        ;

    }
/*
    @Test
    @DisplayName("관리자가 교수의 강의에 출석 세션을 개설함")
    public void createCorClass_Admin() throws Exception {
        // Given
        User admin = sampleDataCreator.generateUsrUsers("admin", "pass", UserType.ADMIN);
        TokenDto usrToken = this.sampleDataCreator.getToken(admin);
        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);    // 강의소유자
        int courseId = 1;
        Course course = sampleDataCreator.generateCorCourse(courseId);
        sampleDataCreator.generateCorCourseOwner(course, professor);

        CorClassDto request = CorClassDto.builder()
                .courseId(Integer.toString(courseId))
                .build();


        // When & Then
        this.mockMvc.perform(post("/api/class")
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("classId").exists())
        ;

    }
    */

    @Test
    @DisplayName("관리자가 없는 강의에 출석 세션을 개설함")
    public void createCorClass_NotExist() throws Exception {
        // Given
        User admin = sampleDataCreator.generateUsrUsers("admin", "pass", UserType.ADMIN);
        TokenDto usrToken = this.sampleDataCreator.getToken(admin);
        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);    // 강의소유자
        int courseId = 1;
        Course course = sampleDataCreator.generateCorCourse(courseId);
        sampleDataCreator.generateCorCourseOwner(course, professor);

        CorClassDto request = CorClassDto.builder()
                .courseId(course.getCourseId()+999)
                .build();


        // When & Then
        this.mockMvc.perform(post("/api/class")
                        .content(objectMapper.writeValueAsString(request))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
        ;

    }



/*
    @Test
    @DisplayName("수업 수강하는 학생들 목록 가져오기")
    public void findUsersByCourseId() throws Exception {
        // Given
        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);

        TokenDto usrToken = this.sampleDataCreator.getToken(professor);

        int courseId = 1;
        Course course = sampleDataCreator.generateCorCourse(courseId);
        sampleDataCreator.generateCorCourseOwner(course, professor);

        CorClassDto request = CorClassDto.builder()
                .courseId(Integer.toString(courseId))
                .week("3")
                .build();


        // When & Then
        this.mockMvc.perform(get("/api/class//getcorclass/{courseId}")
                .content(objectMapper.writeValueAsString(request))
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("classId").exists())
        ;

    }*/

}