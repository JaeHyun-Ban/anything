package com.anything.member.controller;

import com.anything.member.dto.MemberResponse;
import com.anything.member.dto.SignupRequest;
import com.anything.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.anything.member.dto.LoginRequest;
import com.anything.member.dto.LoginResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("signup")
    public ResponseEntity<MemberResponse> signup(@Valid @RequestBody SignupRequest request){
        return ResponseEntity.ok(memberService.signup(request)); // 상태코드 200 OK, 응답 body: memberResponse
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(memberService.login(request));
    }

    // 회원정보조회
    @GetMapping("/me")
    public ResponseEntity<MemberResponse> getMyInfo(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(memberService.getMyInfo(userDetails.getUsername()));
    }
}
