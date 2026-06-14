# 프론트엔드 실행 가이드

이 문서는 프론트엔드를 처음 실행할 때 필요한 경로, 명령어, 파일 역할을 정리한 문서입니다.

## 현재 구조

프로젝트 루트 경로:

```bash
/Users/banjaehyeon/Desktop/workspace/anything
```

프론트엔드 경로:

```bash
/Users/banjaehyeon/Desktop/workspace/anything/frontend
```

주요 파일:

```text
frontend/
├── index.html
├── package.json
├── package-lock.json
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## 파일 역할

`frontend/package.json`

프론트엔드 실행 명령어와 설치할 라이브러리 목록이 들어있는 파일입니다.

`frontend/index.html`

브라우저가 처음 읽는 HTML 파일입니다. React 화면이 들어갈 `root` 영역이 있습니다.

`frontend/src/main.jsx`

React 앱을 시작하는 파일입니다. `App.jsx`를 `index.html`의 `root` 영역에 연결합니다.

`frontend/src/App.jsx`

로그인 화면과 회원가입 화면의 실제 동작이 들어있는 파일입니다.

`frontend/src/styles.css`

화면 색상, 간격, 입력창, 버튼, 모바일 반응형 스타일이 들어있는 파일입니다.

## 처음 한 번만 설치하기

터미널에서 프로젝트 루트로 이동합니다.

```bash
cd /Users/banjaehyeon/Desktop/workspace/anything
```

프론트엔드 폴더로 이동합니다.

```bash
cd frontend
```

라이브러리를 설치합니다.

```bash
npm install
```

설치가 끝나면 `frontend/node_modules` 폴더가 생깁니다. 이 폴더는 설치된 라이브러리 모음이라 직접 수정하지 않아도 됩니다.

## 개발 서버 실행하기

프론트엔드 폴더에서 아래 명령어를 실행합니다.

```bash
npm run dev
```

성공하면 터미널에 보통 이런 주소가 나옵니다.

```text
Local:   http://localhost:5173/
```

브라우저에서 아래 주소로 접속하면 화면을 볼 수 있습니다.

```text
http://localhost:5173/
```

## 실행 중인 서버 끄기

`npm run dev`를 실행한 터미널에서 아래 키를 누릅니다.

```text
Control + C
```

Mac 키보드에서는 `control` 키와 `c` 키를 같이 누르면 됩니다.

## 화면 수정 후 확인하기

개발 서버가 켜져 있는 상태에서 아래 파일을 수정하면 브라우저 화면이 자동으로 갱신됩니다.

```text
frontend/src/App.jsx
frontend/src/styles.css
```

자동 갱신이 안 보이면 브라우저에서 새로고침하면 됩니다.

## 빌드 확인하기

배포 가능한 결과물이 만들어지는지 확인하려면 프론트엔드 폴더에서 아래 명령어를 실행합니다.

```bash
npm run build
```

성공하면 `frontend/dist` 폴더가 생깁니다.

`dist` 폴더는 빌드 결과물이므로 직접 수정하지 않습니다. 화면을 바꾸려면 `src` 안의 파일을 수정한 뒤 다시 빌드합니다.

## 빌드 결과 미리보기

`npm run build`를 실행한 뒤 빌드 결과를 미리 보고 싶으면 아래 명령어를 실행합니다.

```bash
npm run preview
```

터미널에 나오는 `http://localhost:숫자/` 주소로 접속하면 빌드된 화면을 확인할 수 있습니다.

## 현재 만든 화면

로그인 화면:

- 아이디 입력
- 비밀번호 입력
- 로그인 버튼
- 회원가입 버튼

회원가입 화면:

- 아이디
- 비밀번호
- 생년월일
- 성별
- 이메일
- 주소
- 닉네임

필수값:

- 아이디
- 비밀번호

아이디나 비밀번호를 비운 상태로 회원가입 버튼을 누르면 안내 문구가 표시됩니다.

## 자주 헷갈리는 것

명령어는 `frontend` 폴더 안에서 실행해야 합니다.

```bash
cd /Users/banjaehyeon/Desktop/workspace/anything/frontend
npm run dev
```

백엔드 스프링부트 실행 명령어와 프론트엔드 실행 명령어는 다릅니다.

```bash
# 백엔드
./gradlew bootRun

# 프론트엔드
npm run dev
```

`node_modules`와 `dist`는 GitHub에 올리지 않습니다. 이미 `.gitignore`에 제외 설정이 들어가 있습니다.

## 문제가 생겼을 때

`npm: command not found`가 나오면 Node.js가 설치되어 있지 않거나 터미널이 Node.js를 찾지 못하는 상태입니다.

`npm run dev` 실행 중 포트가 이미 사용 중이라고 나오면 터미널에 나온 다른 주소를 사용하거나, 기존에 켜둔 개발 서버를 `Control + C`로 종료한 뒤 다시 실행합니다.

화면이 안 뜨면 아래 순서대로 확인합니다.

1. 현재 위치가 `frontend` 폴더인지 확인합니다.
2. `npm install`을 먼저 실행했는지 확인합니다.
3. `npm run dev`를 실행했는지 확인합니다.
4. 브라우저 주소가 `http://localhost:5173/`인지 확인합니다.
