package kr.ac.yongin.yiattendance.attendance;

import kr.ac.yongin.yiattendance.corclass.CorClass;
import kr.ac.yongin.yiattendance.dto.AttendanceUpdatesRequestDTO;
import kr.ac.yongin.yiattendance.corclass.CorClassService;
import kr.ac.yongin.yiattendance.course.Course;
import kr.ac.yongin.yiattendance.course.CourseService;
import kr.ac.yongin.yiattendance.dto.AttendanceResponseDto;
import kr.ac.yongin.yiattendance.dto.CourseResponseDto;
import kr.ac.yongin.yiattendance.exception.authentication.AccessDeniedException;
import kr.ac.yongin.yiattendance.exception.entitynotfound.AttendanceNotFoundException;
import kr.ac.yongin.yiattendance.exception.invalidinput.MultipleCorClassException;
import kr.ac.yongin.yiattendance.learner.CourseLearnerService;
import kr.ac.yongin.yiattendance.owner.CourseOwnerService;
import kr.ac.yongin.yiattendance.user.User;
import kr.ac.yongin.yiattendance.user.UserType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final CourseLearnerService courseLearnerService;
    private final CourseOwnerService courseOwnerService;
    // private final CorClassService corClassService; 순환 참조 오류 발생으로 제거

    //private  List<Attendance> attendances = new ArrayList<>();
    //변경 필요 List 변경 오류 날 가능성

    //개개인 출결상태 저장 메소드
    //DB에 저장 X
    /*
    public Attendance attendancePerson(User user, AttendancePersonDto attendancePersonDto) {
        //1. 교수 자신의 강좌 확인은 Cor_Class까지 등록된 이상 이미 검증 완료되었으므로 패스함.


        //2, DTO에서 넘긴 정보 기반으로 attendace 객체 생성 후 list에 저장 및 response로 보내줌
        Optional<CorClass> corClass = classService.getCorClassById(attendancePersonDto.getClassId());
        Optional<User> student = userService.getUserById(attendancePersonDto.getUserId());
        Date time = new Date();


        Attendance attendance =Attendance.builder()
                .corClass(corClass.get())
                .user(student.get())
                .atdDate(time)
                .status(attendancePersonDto.getStatus())
                .build();

        //개인의 출결상태 list에 저장
        attendances.add(attendance);

        return attendance;
    }

    //저장된 list 저장 메소드
    public List<Attendance> saveAttendance(User user){

        List<Attendance> attendancesSave = attendances;
        attendances=new ArrayList<>();

        attendanceRepository.saveAll(attendancesSave);
        return attendancesSave;
    }
*/


    public List<Attendance> createAttendance(CorClass corClass){

        List<User> learners = findUsersByCourseId(corClass.getCourse().getCourseId());

        // 참가하는 User 객체들을 Attendance로 변환
        List<Attendance> attendances = new ArrayList<>();

        List<Attendance> finalAttendances = attendances;
        learners.stream().forEach(usr -> {
            Attendance attendance = Attendance.builder()
                    .corClass(corClass)
                    .user(usr)
                    .atdDate(new Date())
                    .status("0")
                    .build();
            finalAttendances.add(attendance);
        });

        attendanceRepository.saveAll(attendances);
        return attendances;

    }

    public void updateAttendances(User requestUser, List<AttendanceUpdatesRequestDTO> updateDTOs) {
        // 한 요청에 여러 corClass들을 수정할 수 없음.
        CorClass corClass = attendanceRepository.findCorClassByAtdId(updateDTOs.get(0).getAttendanceId());
        updateDTOs.stream().forEach(attendanceUpdatesRequestDTO -> {
            CorClass corClassByAtdId = attendanceRepository.findCorClassByAtdId(attendanceUpdatesRequestDTO.getAttendanceId());
            if (corClassByAtdId == null) {
                List<FieldError> fieldErrorList = new ArrayList<>();
                fieldErrorList.add(new FieldError("Attendance", "atdId", attendanceUpdatesRequestDTO.getAttendanceId(), false, null, null, "Attendance is not exist."));
                throw new AttendanceNotFoundException(fieldErrorList);
            }
            if(!corClassByAtdId.getClassId().equals(corClass.getClassId())) {
                List<FieldError> fieldErrorList = new ArrayList<>();
                fieldErrorList.add(new FieldError("Attendance", "atdId", attendanceUpdatesRequestDTO.getAttendanceId(), false, null, null, "다른 classId를 갖는 출석입니다."));
                throw new MultipleCorClassException(fieldErrorList);
            }
        });
        // 관리자도 아니면서 본인 강좌가 아니면 애초에 수정이 불가능
        if (!(requestUser.getUserType() == UserType.ADMIN ||
                courseOwnerService.isCourseOwner(corClass.getCourse().getCourseId(), requestUser.getUserId()))) {
            // 관리자가 아닌데, 본인 강좌가 아닌 것에 접근한다면
            List<FieldError> fieldErrorList = new ArrayList<>();
            FieldError fieldError = new FieldError("Attendance", "atdId", updateDTOs.get(0).getAttendanceId(), false, null, null, "Not your own course.");
            fieldErrorList.add(fieldError);
            throw new AccessDeniedException(fieldErrorList);
        }

        List<Attendance> attendances = new ArrayList<>();
        updateDTOs.stream().forEach(attendanceUpdatesRequestDTO -> {
            Optional<Attendance> attendanceOptional = attendanceRepository.findById(attendanceUpdatesRequestDTO.getAttendanceId());
            if (attendanceOptional.isEmpty()) {
                List<FieldError> fieldErrorList = new ArrayList<>();
                FieldError fieldError = new FieldError("Attendance", "attendanceId", attendanceUpdatesRequestDTO.getAttendanceId(), false, null, null, "Not exist attendance.");
                fieldErrorList.add(fieldError);
                throw new AttendanceNotFoundException(fieldErrorList);
            }
            Attendance attendance = attendanceOptional.get();
            attendance.setStatus(attendanceUpdatesRequestDTO.getStatus());
            attendances.add(attendance);
        });

        attendanceRepository.saveAll(attendances);

    }

    public List<User> findUsersByCourseId(String courseId){
        return courseLearnerService.findUsersByCourseId(courseId);
    }

    public List<Attendance> findAttendancesByClassId(Long classId) {
        return attendanceRepository.findAllByCorClassClassId(classId);
    }

    public List<AttendanceResponseDto> checkAttendanceStatus(User user, String courseId) {
        List<Attendance> attendances = new ArrayList<>();
        List<CorClass> corClasses = new ArrayList<>();
        List<AttendanceResponseDto> attendanceResponseDtos = new ArrayList<>();
        if (user.getUserType() ==UserType.STUDENT) {
             attendances = attendanceRepository.getStudentAttendanceByCourseId(courseId,user.getUserId());
             corClasses = attendanceRepository.getStudentCorClassByUserId(courseId,user.getUserId());

             //attendances = attendanceRepository.findAll();

            for (int i = 0; i < attendances.size(); i++) {
                AttendanceResponseDto attendanceResponseDto = AttendanceResponseDto.builder()
                        .attendance(attendances.get(i))
                        .round(corClasses.get(i).getRound())
                        .status(attendances.get(i).getStatus())
                        .sessionDate(attendances.get(i).getAtdDate())
                        .week(corClasses.get(i).getWeek())
                        .status(attendances.get(i).getStatus())
                        .total(attendances.size())
                        .normal(getNormal(attendances))
                        .absent(getAbsent(attendances))
                        .late(getLate(attendances))
                        .build();
                attendanceResponseDtos.add(attendanceResponseDto);
            }

        } else if(user.getUserType() ==UserType.PROFESSOR){
            attendances = attendanceRepository.getProfAttendanceByCourseId(courseId,user.getUserId());
            corClasses = attendanceRepository.getProfCorClassByCourseId(courseId,user.getUserId());

            for (int i = 0; i <attendances.size(); i++) {
                AttendanceResponseDto attendanceResponseDto = AttendanceResponseDto.builder()
                        .attendance(attendances.get(i))
                        .round(corClasses.get(i).getRound())
                        .sessionDate(attendances.get(i).getAtdDate())
                        .week(corClasses.get(i).getWeek())
                        .status(attendances.get(i).getStatus())
                        .total(attendances.size())
                        .normal(getNormal(attendances))
                        .absent(getAbsent(attendances))
                        .late(getLate(attendances))
                        .build();
                attendanceResponseDtos.add(attendanceResponseDto);

            }
        }
        return attendanceResponseDtos;
    }//checkAttendance

    private int getNormal(List<Attendance> attendances){
        int normal=0;
        for (int i = 0; i < attendances.size(); i++) {
            if (attendances.get(i).getStatus().equals("출석")) {
                normal++;
            }
        }
        return normal;
    }

    private int getAbsent(List<Attendance> attendances){
        int absent=0;
        for (int i = 0; i < attendances.size(); i++) {
            if (attendances.get(i).getStatus().equals("결석")) {
                absent++;
            }
        }
        return absent;
    }

    private int getLate(List<Attendance> attendances){
        int late=0;
        for (int i = 0; i < attendances.size(); i++) {
            if (attendances.get(i).getStatus().equals("지각")) {
                late++;
            }
        }
        return late;
    }
}

