package com.anything.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

/**
 * 회원가입 요청 데이터
 */
@Getter
public class SignupRequest {

    @NotBlank
    private String loginId;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    private String birthDate;
    private String gender;
    private String email;
    private String address;
    private String nickname;
}
