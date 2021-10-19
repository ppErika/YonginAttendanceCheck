package kr.ac.yongin.yiattendance.user;


import kr.ac.yongin.yiattendance.dto.LoginDto;
import kr.ac.yongin.yiattendance.dto.TokenDto;
import kr.ac.yongin.yiattendance.exception.invalidinput.InputValidationFailedException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@AllArgsConstructor
@RequestMapping(value = "/api/auth")
public class UserController {

    private final UserService userService;

    /*//임시 회원가입
    @PostMapping("/signup")
    public ResponseEntity<UsrUsers> save(@RequestBody Map<String, String> newUser) {
        return ResponseEntity.ok(usrUsersService.save(newUser.get("userId"), newUser.get("password")));
    }*/

    //기존 로그인 DB검증
    /*@PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDto user,
                                Errors errors) {
        // 로그인 정보 입력을 제대로 안했다면 오류
        if (errors.hasErrors()) {
            throw new InputValidationFailedException();
        }
        return ResponseEntity.ok(userService.login(user));
    }
    */


    //LMS 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody @Valid LoginDto user,
                                          Errors errors) {
        // 로그인 정보 입력을 제대로 안했다면 오류
        if (errors.hasErrors()) {
            throw new InputValidationFailedException();
        }
        return ResponseEntity.ok(userService.login(user));
    }


    //토큰 재발급
    @PostMapping("/token")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenDto token) {
        return ResponseEntity.ok(userService.reissue(token.getAccessToken(), token.getRefreshToken()));
    }

    // 로그아웃
    @DeleteMapping("/logout")
    public ResponseEntity logout(@RequestBody TokenDto tokenDto) {
        userService.logout(tokenDto);
        return ResponseEntity.noContent().build();
    }

    //내 정보 가져오기
    @GetMapping("/me")
    public ResponseEntity<User> getMyInfo() {
        return ResponseEntity.ok(userService.getMyInfo());
    }


    @GetMapping("/studentme")
    @Secured({UserType.Authority.STUDENT})
    public ResponseEntity<User> getMyInfoStudent() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    @GetMapping("/profme")
    @Secured({UserType.Authority.PROFESSOR})
    public ResponseEntity<User> getMyInfoProf() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    @GetMapping("/adminme")
    @Secured({UserType.Authority.ADMIN})
    public ResponseEntity<User> getMyInfoAdmin() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

}