package com.anything.member.service;

import com.anything.member.dto.LoginRequest;
import com.anything.member.dto.MemberResponse;
import com.anything.member.dto.SignupRequest;
import com.anything.member.entity.Member;
import com.anything.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.anything.global.security.JwtUtil;
import com.anything.member.dto.LoginResponse;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    @Transactional
    public MemberResponse signup(SignupRequest request) {
        if(memberRepository.existByLoginId(request.getLoginId())) {
            throw new IllegalStateException("이미 사용 중인 아이디 입니다.");
        }

        Member member = Member.builder()
                .loginId(request.getLoginId())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .birthDate(request.getBirthDate())
                .gender(request.getGender())
                .email(request.getEmail())
                .address(request.getAddress())
                .nickname(request.getNickname())
                .build();

        return new MemberResponse(memberRepository.save(member));
    }

    public MemberResponse getMyInfo(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다"));
        return new MemberResponse(member);
    }

    // 로그인 메서드
    public LoginResponse login(LoginRequest request) {
        Member member = memberRepository.findByLoginId(request.getLoginId())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        String token = jwtUtil.generateToken(member.getLoginId());
        return new LoginResponse(token, new MemberResponse(member));
    }
}
