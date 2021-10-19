package kr.ac.yongin.yiattendance.configs;


import kr.ac.yongin.yiattendance.handler.JwtAccessDeniedHandler;
import kr.ac.yongin.yiattendance.filter.JwtAuthenticationEntryPoint;
import kr.ac.yongin.yiattendance.provider.TokenProvider;
import kr.ac.yongin.yiattendance.provider.YonginAuthServerAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final YonginAuthServerAuthenticationProvider yonginAuthServerAuthenticationProvider;

    @Override
    public void configure(WebSecurity web) throws Exception {
     //  web.ignoring().mvcMatchers("/**");
       web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());    // 정적자원 로그인 없이

    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(yonginAuthServerAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                //로그인 요청은 토큰없어도 가능하게 permitall
                .antMatchers("/api/auth/login")
                .permitAll()
                .antMatchers("/api/auth/token")
                .permitAll()
                .antMatchers("/api/auth/signup")
                .permitAll()
                .antMatchers("/api/auth/token")
                .permitAll()
                .antMatchers("/api/auth/logout")
                .permitAll()
                //그 외 요청은 인증필요
                .anyRequest().
                authenticated()

                //예외처리
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)



                //세션 사용 안하므로 statless 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)


                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
              //  .and()
               // .apply(new JwtSecurityConfig(tokenProvider));
               // .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),UsernamePasswordAuthenticationFilter.class);
    //.addFilterBefore(ajaxLoginProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
    }

}
