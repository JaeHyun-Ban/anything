package com.anything.member.dto;

import com.anything.member.entity.Member;
import lombok.Getter;

/**
 * 회원 정보 응답 데이터
 */
@Getter
public class MemberResponse {

    private final Long id;
    private final String loginId;
    private final String name;
    private final String birthDate;
    private final String gender;
    private final String email;
    private final String address;
    private final String nickname;


    public MemberResponse(Member member) {
        this.id = member.getId();
        this.loginId = member.getLoginId();
        this.name = member.getName();
        this.birthDate = member.getBirthDate();
        this.gender = member.getGender();
        this.email = member.getEmail();
        this.address = member.getAddress();
        this.nickname = member.getNickname();
    }
}
