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

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private  final PasswordEncoder passwordEncoder;

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
}
