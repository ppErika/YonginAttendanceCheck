package kr.ac.yongin.yiattendance.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ac.yongin.yiattendance.attendance.Attendance;
import kr.ac.yongin.yiattendance.attendance.AttendanceRepository;
import kr.ac.yongin.yiattendance.college.College;
import kr.ac.yongin.yiattendance.college.CollegeRepository;
import kr.ac.yongin.yiattendance.corclass.CorClass;
import kr.ac.yongin.yiattendance.corclass.CorClassRepository;
import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.course.LearningType;
import kr.ac.yongin.yiattendance.course.CourseRepository;
import kr.ac.yongin.yiattendance.term.CourseTerm;
import kr.ac.yongin.yiattendance.term.CourseTermRepository;
import kr.ac.yongin.yiattendance.department.Department;
import kr.ac.yongin.yiattendance.department.DepartmentRepository;
import kr.ac.yongin.yiattendance.dto.LoginDto;
import kr.ac.yongin.yiattendance.dto.TokenDto;
import kr.ac.yongin.yiattendance.learner.CourseLearner;
import kr.ac.yongin.yiattendance.learner.CourseLearnerPK;
import kr.ac.yongin.yiattendance.learner.CourseLearnerRepository;
import kr.ac.yongin.yiattendance.owner.CourseOwner;
import kr.ac.yongin.yiattendance.owner.CourseOwnerPK;
import kr.ac.yongin.yiattendance.owner.CourseOwnerRepository;
import kr.ac.yongin.yiattendance.owner.OwnerType;
import kr.ac.yongin.yiattendance.user.User;
import kr.ac.yongin.yiattendance.user.UserRepository;
import kr.ac.yongin.yiattendance.user.UserStatus;
import kr.ac.yongin.yiattendance.user.UserType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Component
@AllArgsConstructor
public class SampleDataCreator {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    private CourseRepository courseRepository;
    private UserRepository userRepository;
    private DepartmentRepository departmentRepository;
    private CourseLearnerRepository courseLearnerRepository;
    private CourseOwnerRepository corCourseOwnerRepository;
    private CollegeRepository collegeRepository;
    private AttendanceRepository attendanceRepository;
    private CorClassRepository corClassRepository;
    private CourseTermRepository courseTermRepository;



    public CourseLearner generateLearner(Course course, User user) {
        CourseLearnerPK courseLearnerPK = CourseLearnerPK.builder()
                .course(course)
                .user(user)
                .build();
        CourseLearner courseLearner = CourseLearner.builder()
                .courseLearnerPK(courseLearnerPK)
                .userName(courseLearnerPK.getUser().getUserName())
                .build();
        courseLearnerRepository.save(courseLearner);

        return courseLearner;
    }

    // 학생 한명을 만들면서 count개의 수강을 신청함
    public User generateUsersWithCourseLearners(String id, int count) {
        String indStr = Integer.toString(count);
        Random createRandom = new Random();
        User user = generateUsrUsers(id, "pass", UserType.STUDENT);

        for (int i=0;i<count;i++) {
            Course course = generateCorCourse(Integer.parseInt(Integer.toString(i)+Integer.toString(createRandom.nextInt(999))));
            generateLearner(course, user);
        }

        return user;
    }

    // 강의 하나를 만들면서 여러명이 수강을 신청함
    public Course generateCourseWithCourseLearners(int index) {
        String indStr = Integer.toString(index);
        Random createRandom = new Random();
        Course course = generateCorCourse(index);


        for (int i=0;i<createRandom.nextInt(30);i++) {
            User user = generateUsrUsers(Integer.toString(i) + indStr, "pass", UserType.STUDENT);
            generateLearner(course, user);
        }

        return course;
    }

    // 교수 한명을 만들면서 count개의 수강을 신청함
    public User generateUsrUsersWithCorCourseOwner(String id, int count) {
        String indStr = Integer.toString(count);
        Random createRandom = new Random();
        User user = generateUsrUsers(id, "pass", UserType.PROFESSOR);

        for (int i=0;i<count;i++) {
            Course course = generateCorCourse(Integer.parseInt(Integer.toString(i)+Integer.toString(createRandom.nextInt(999))));
            generateCorCourseOwner(course, user);
        }

        return user;
    }

    public CourseOwner generateCorCourseOwner(Course course, User user) {
        CourseOwnerPK pk = CourseOwnerPK.builder()
                .course(course)
                .user(user)
                .build();
        CourseOwner courseOwner = CourseOwner.builder()
                .courseOwnerPK(pk)
                .ownerType(OwnerType.PROFESSOR)
                .userName(pk.getUser().getUserName())
                .build();
        this.corCourseOwnerRepository.save(courseOwner);

        return courseOwner;
    }

    public User generateUsrUsers(String id, String password, UserType type) {
        Random createRandom = new Random();

        College college = generateCollege(createRandom.nextInt(999)+1);
        Department department = generateUsrDepartment(createRandom.nextInt(999) + 1);



        return makeUser(id, password, type, college,department);
    }

    public User generateUsrUsers(String id, String password, UserType type, College college ,Department department) {
        return makeUser(id, password, type, college ,department);
    }

    private User makeUser(String id, String password, UserType type, College college ,Department department) {
        Random createRandom = new Random();

        String grade = type==UserType.STUDENT?Integer.toString(createRandom.nextInt(4) + 1):null;
        User user = User.builder()
                .userId(id)
                .password("{noop}"+password)
                .userName(id + "이름")
                .collegeId(college)
                .departmentId(department)
                .userType(type)
                .userNo(id)
                .userGrade(grade)
                .userStatus(UserStatus.NORMAL)
                .phoneMobile("010-1234-5678")
                .phoneEtc("02-2222-2222")
                .email("email@email.com")
                .build();

        userRepository.save(user);

        return user;
    }


    public College generateCollege(int index){

        String indStr = Integer.toString(index);

        College college = College.builder()
                .CollegeId(indStr)
                .CollegeName(indStr+"학과")
                .build();

        collegeRepository.save(college);

        return college;
    }


    public Department generateUsrDepartment(int index) {
        String indStr = Integer.toString(index);

        Department department = Department.builder()
                .departmentId(indStr)
                .departmentName(indStr + "이름")
                .build();

        departmentRepository.save(department);

        return department;
    }

    public Course generateCorCourse(int index) {
        CourseTerm courseTerm = generateCourseTerm(index, LocalDate.now(), LocalDate.now());
        Department department = generateUsrDepartment(index);
        return generateCorCourse(index, department, courseTerm);
    }

    // CourCourse 내부의 CourseType을 index에 알맞게 자동 생성함.
    public Course generateCorCourse(int index, CourseTerm courseTerm) {
        Department department = generateUsrDepartment(index);
        return generateCorCourse(index, department, courseTerm);
    }

    // CourCourse 내부의 CourseType을 받아와서 생성.
    public Course generateCorCourse(int index, Department department, CourseTerm courseTerm) {
        String indStr = Integer.toString(index);

        Random createRandom = new Random();

        Course course = Course.builder()
                .courseId(indStr)
                .courseTerm(courseTerm)
                .courseCode("CourseCode")
                .courseName("이름_"+index)
                .courseNameEng("Name_"+index)
                .courseType("123123")
                .courseSisu(123123)
                .daygb("3510003")
                .daynm("화")
                .roomcd("123123")
                .roomnm("환과대7217")
                .startcd("1123213")
                .starttime("10:12")
                .endcd("123123")
                .endtime("20:12")
                .department(department)
                .credit((byte) (createRandom.nextInt(3) + 1))   // 학점 1~3학점 랜덤
                .learningType(LearningType.MIX)
                .grade(Integer.toString(createRandom.nextInt(4)+1))
                .gunType("N")
                .scoreRateType("N")
                .build()
                ;

        this.courseRepository.save(course);

        return course;
    }

    public CourseTerm generateCourseTerm(int index, LocalDate start, LocalDate end) {
        // Given
        String indStr = Integer.toString(index);

        CourseTerm courseTerm = CourseTerm.builder()
                .courseTermId(indStr)
                .courseTermName(indStr + "이름")
                .startDate(start)
                .endDate(end)
                .courseTermType("courseTermType")
                .build();

        courseTermRepository.save(courseTerm);

        return courseTerm;

    }

    public TokenDto getToken(User userUser) throws Exception {
        // Given
        //LoginDTO에 맞게 수정
        String userType ="";
        switch (userUser.getUserType()){
            case STUDENT: userType="1";
            break;
            case PROFESSOR: userType="2";
                break;
            case ADMIN: userType="3";
                break;

        }


        LoginDto loginDto = LoginDto.builder()
                .userType(userType)
                .userId(userUser.getUserId())
                .password(userUser.getPassword().substring(6))
                .build();

        // When & Then
        ResultActions perform = this.mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(this.objectMapper.writeValueAsString(loginDto))
        );

        String contentAsString = perform.andReturn().getResponse().getContentAsString();
        if (contentAsString.isBlank()) {
            throw new BadCredentialsException("ID or password is incorrect.");
        }
        TokenDto tokenDto = objectMapper.readValue(contentAsString, TokenDto.class);
        return tokenDto;
    }




    //동기화 로그인 위해 수정
    public TokenDto getUserAndToken(User userUser) throws Exception {

        // Given

        generateUsrUsers(userUser.getUserId(), "1", UserType.STUDENT);

        LoginDto loginDto = LoginDto.builder()
                .userId(userUser.getUserId())
                .password(userUser.getPassword())
                .build();

        // When & Then
        ResultActions perform = this.mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(this.objectMapper.writeValueAsString(loginDto))
        );

        String contentAsString = perform.andReturn().getResponse().getContentAsString();
        if (contentAsString.isBlank()) {
            throw new BadCredentialsException("ID or password is incorrect.");
        }
        TokenDto tokenDto = objectMapper.readValue(contentAsString, TokenDto.class);
        return tokenDto;
    }


    //CorClass 생성 메소드
    public CorClass generateCorClass(int index,User user){

        long lnindex = Long.valueOf(index);
        String strindex = Integer.toString(index);



        Course course= generateCorCourse(index);
        generateCorCourseOwner(course,user);

        CorClass corClass= CorClass.builder()
                .classId(lnindex)
                .course(course)
                .user(user)
                .sessionDate(LocalDateTime.now())
                .week(index)
                .round((byte) index)
                .status("NORMAL")
                .build();

        this.corClassRepository.save(corClass);

        return corClass;
    }



    public CorClass generateCorClassDetail(long classId,int courseId,int week, byte round,User user){

        Course course= generateCorCourse(courseId);
        generateCorCourseOwner(course,user);

        CorClass corClass= CorClass.builder()
                .classId(classId)
                .course(course)
                .user(user)
                .sessionDate(LocalDateTime.now())
                .week(week)
                .round(round)
                .status("NORMAL")
                .build();

        this.corClassRepository.save(corClass);

        return corClass;
    }



    public Attendance generateAttendance(int index,CorClass corClass,User user,String status){

        long lnindex = Long.valueOf(index);
        Date time = new Date();

        Attendance attendance = Attendance.builder()
                .atdId(lnindex)
                .corClass(corClass)
                .user(user)
                .atdDate(time)
                .status(status)
                .build();

        //this.attendanceRepository.save(attendance);

        return attendance;
    }

/*

    public Attendance runAttendance(int index) throws Exception {
        // Given

        User professor = generateUsrUsers("professor", "pass", UserType.PROFESSOR);
        User stud = generateUsrUsers("student"+index,"pass",UserType.STUDENT);

        TokenDto usrToken = getToken(professor);

        CorClass corclass = generateCorClass(1,professor);


        AttendancePersonDto request = AttendancePersonDto.builder()
                .ClassId(corclass.getClassId())
                .UserId(stud.getUserId())
                .status("출석")
                .build();

        // When & Then


        ResultActions perform= this.mockMvc.perform(post("/api/attendance/person")
                .content(objectMapper.writeValueAsString(request))
                .header(HttpHeaders.AUTHORIZATION, "Bearer"+usrToken.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON));


        String contentAsString = perform.andReturn().getResponse().getContentAsString();

        Attendance attendance = objectMapper.readValue(contentAsString, Attendance.class);
        return attendance;
    }

*/

    public List<Attendance> generateAttendanceList(CorClass corclass, int studentNum) {

        List<Attendance> attendances = new ArrayList<>();
        for (int i = 0; i < studentNum; i++) {
            User stud = generateUsrUsers("student"+i,"pass",UserType.STUDENT);
            Attendance attendance = generateAttendance(studentNum,corclass,stud,"출석");
            attendances.add(attendance);
        }

        return attendances;
    }



    public List<Attendance> generateStudAttendanceList(CorClass corClass,User stud,int studentNum){
        List<Attendance> attendances = new ArrayList<>();
        for (int i = 0; i < studentNum; i++) {
            String status="";
            if (i%2==0) {
                status="출석";
            }else{
                status="결석";
            }
            //확인할 사용자
            Attendance attendance = generateAttendance(i,corClass,stud,status);
            attendances.add(attendance);
            //가짜
            User fakeStud = generateUsrUsers("fakestudent"+i,"pass",UserType.STUDENT);
            Attendance fakeattendance = generateAttendance(i+10,corClass,fakeStud,status);
            attendances.add(fakeattendance);
        }
        this.attendanceRepository.saveAll(attendances);
        return attendances;
    }



    public List<Attendance> generateProfAttendanceList(CorClass corClass,int total,int studentNum){
        List<Attendance> attendances = new ArrayList<>();
        for (int i = 0; i < total; i++) {
            String status="";
            if (i%3==0) {
                status="출석";
            }else if(i%3==1){
                status="결석";
            }else if(i%3==2){
                status="지각";
            }


            for (int j = 0; j < studentNum; j++) {
                //가짜
                User fakeStud = generateUsrUsers("fakestudent"+i,"pass",UserType.STUDENT);
                Attendance fakeattendance = generateAttendance(i,corClass,fakeStud,status);
                attendances.add(fakeattendance);
            }

        }
        this.attendanceRepository.saveAll(attendances);
        return attendances;
    }

    public void generateAttendanceAndCorClass(User user,int number){

        for (int i = 0; i < number; i++) {
            long longI = Long.valueOf(i);
            CorClass corClass = generateCorClassDetail(longI,1,i,(byte)i,user);
            List<Attendance> attendances= generateProfAttendanceList(corClass,6,20);

        }

    }


}
