package kr.ac.yongin.yiattendance.user;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UserContext extends org.springframework.security.core.userdetails.User {

    private final User user;


    public UserContext(User user, Collection<? extends GrantedAuthority> authorities) {
        super(user.getUserId(), user.getPassword(), authorities);
       this.user = user;
    }

    public User getUsrUsers(){
        return user;
    }
}
