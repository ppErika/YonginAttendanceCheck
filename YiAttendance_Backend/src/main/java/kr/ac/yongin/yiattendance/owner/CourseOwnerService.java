package kr.ac.yongin.yiattendance.owner;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseOwnerService {

    private final CourseOwnerRepository corCourseOwnerRepository;

    public boolean isCourseOwner(String courseId, String userId) {
        // CourseOwner이면 True, 아니면 False 반환
        return corCourseOwnerRepository.isCourseOwner(courseId, userId) != 0;
    }

    //courseId로 교수정보 가져옴
    public List<CourseOwner> getProfInfoByCourseId(String courseId){
        return corCourseOwnerRepository.getProfInfoByCourseId(courseId);
    }

}
