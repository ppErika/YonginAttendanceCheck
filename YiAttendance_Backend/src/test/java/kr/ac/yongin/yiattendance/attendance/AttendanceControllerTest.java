package kr.ac.yongin.yiattendance.attendance;

import kr.ac.yongin.yiattendance.common.BaseTest;
import kr.ac.yongin.yiattendance.corclass.CorClass;
import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.dto.AttendanceUpdatesRequestDTO;
import kr.ac.yongin.yiattendance.dto.TokenDto;
import kr.ac.yongin.yiattendance.user.User;
import kr.ac.yongin.yiattendance.user.UserType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AttendanceControllerTest extends BaseTest {

    @Autowired
    AttendanceService attendanceService;

    /*
    @Test
    @DisplayName("출석부 리스트 수정")
    public void attendanceUpdate() throws Exception{

        //Given
        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);
        TokenDto usrToken = this.sampleDataCreator.getToken(professor);
        CorClass corclass = sampleDataCreator.generateCorClass(1,professor);

        int studentNum = 10;
        List<Attendance> attendances = sampleDataCreator.generateAttendanceList(corclass,studentNum);





        // When & Then
        this.mockMvc.perform(post("/api/attendance/updates")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(attendances))
        )
                .andDo(print())
                .andExpect(status().isCreated());
        //.andExpect(jsonPath("classId").exists())
    }
*/
/*

    @Test
    @DisplayName("잘못된 교수 사용자가 출석부 리스트 저장 시도")
    public void attendanceCreateWrong() throws Exception{

        //Given
        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);
        CorClass corclass = sampleDataCreator.generateCorClass(1,professor);

        User professor2 = sampleDataCreator.generateUsrUsers("professor2", "pass", UserType.PROFESSOR);
        TokenDto usrToken = this.sampleDataCreator.getToken(professor2);

        int studentNum = 10;
        List<Attendance> attendances = sampleDataCreator.generateAttendanceList(corclass,studentNum);



        // When & Then
        this.mockMvc.perform(post("/api/attendance/create")
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(attendances))
        )
                .andDo(print())
                .andExpect(status().isForbidden());
        //.andExpect(jsonPath("classId").exists())
    }
*/

    @Test
    @DisplayName("출석부 해당 USER들")
    public void findUsersByCourseId() throws Exception{
        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);
        TokenDto usrToken = this.sampleDataCreator.getToken(professor);

        Course course = sampleDataCreator.generateCourseWithCourseLearners(1);

        //When & Then
        this.mockMvc.perform(get("/api/attendance/"+course.getCourseId())
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

/*

    @Test
    @DisplayName("학생 출석현황")
    public void attendanceStatusStud() throws Exception{

        //given

        User stud = sampleDataCreator.generateUsrUsers("student", "pass", UserType.STUDENT);
        TokenDto usrToken = this.sampleDataCreator.getToken(stud);

        User fakeStud = sampleDataCreator.generateUsrUsers("fakeStudent", "pass", UserType.STUDENT);

        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);
        CorClass corclass = sampleDataCreator.generateCorClass(1,professor);


        User fakeProfessor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);
        CorClass fakeCorclass = sampleDataCreator.generateCorClass(1,professor);

        List<Attendance> attendances = sampleDataCreator.generateStudAttendanceList(corclass,stud,10);
        //List<Attendance> fakeAttendances = sampleDataCreator.generateStudAttendanceList(fakeCorclass,fakeStud,10);

        //When & Then
        this.mockMvc.perform(get("/api/attendance/user/"+corclass.getCourse().getCourseId())
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }



    @Test
    @DisplayName("교수 출석현황 확인")
    public void attendanceStatusProf() throws Exception{

        //given
        User professor = sampleDataCreator.generateUsrUsers("professor", "pass", UserType.PROFESSOR);
        TokenDto usrToken = this.sampleDataCreator.getToken(professor);
        CorClass corclass = sampleDataCreator.generateCorClass(1,professor);


        User fakeProfessor = sampleDataCreator.generateUsrUsers("fakeProfessor", "pass", UserType.PROFESSOR);
        CorClass fakeCorclass = sampleDataCreator.generateCorClass(2,fakeProfessor);


        User stud = sampleDataCreator.generateUsrUsers("student", "pass", UserType.STUDENT);





        List<Attendance> attendances = sampleDataCreator.generateProfAttendanceList(corclass,5,10);
        List<Attendance> fakeAttendances = sampleDataCreator.generateProfAttendanceList(fakeCorclass,5,10);
        //sampleDataCreator.generateAttendanceAndCorClass(professor,6);

        //When & Then
        this.mockMvc.perform(get("/api/attendance/user/"+corclass.getCourse().getCourseId())
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }
*/


}