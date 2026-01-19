# :game_die: 보드메이트(Board Mate)

지도 기반으로 보드게임 모임 참여 인원을 모집할 수 있는 커뮤니티 서비스입니다.

## :alarm_clock: 작업 기간

#### `MVP`: 24/6/17 - 24/6/21
#### `DEMO Migration` : 26/1/11 - 26/1/20

> **DEMO MODE**
> - 입력 데이터는 브라우저(IndexedDB)에 저장됩니다.
> - 새로고침/재접속 시에도 남아있지만, 브라우저/기기/프로필에 따라 데이터가 분리됩니다.
> - “데모 데이터 초기화”를 누르면 로컬 데이터가 삭제됩니다.

---

<br>

## 1. 왜 데모로 전환했나요? (Motivation)

supabase 무료 플랜 이용의 한계로,  
기존 Supabase 기반 구현을 **서버 의존 없는 데모/목업 환경**으로 전환했습니다.

- 배포 환경에서 “기능 흐름”을 빠르게 재현
- 서버 비용/운영 부담 없이 UI/권한/CRUD를 검증 가능
- 채용/리뷰 상황에서 설치 후 즉시 동작하는 형태를 목표로 함

---

## 2. 실행 방법 (Getting Started)

### 2-1) 설치/실행
```bash
yarn install
yarn dev
```

### 2-1) 환경 변수(.env.local)

> Vite 기준 예시입니다. 프로젝트 설정에 맞게 조정하세요.

```bash
# Kakao JavaScript 키
VITE_KAKAO_JS_KEY=YOUR_KAKAO_JS_KEY
```
- Kakao 지도는 브라우저에서 동작하는 JS SDK를 사용합니다.
- JS 키는 클라이언트에 노출되는 특성이 있으므로, 카카오 개발자 콘솔에서 도메인 제한 설정을 권장합니다.

---

## 3. Demo Mode 동작 방식 (How Demo Works)

### 3-1) 인증(로그인) 방식: 게스트 로그인

- 사용자는 “닉네임 입력”으로 로그인합니다.
- 로그인 시:
    - localStorage(bm_guest_session)에 { userId, nickname, issuedAt } 저장
    - IndexedDB(users)에 user 레코드를 upsert

### 3-2) 데이터 저장소: IndexedDB(idb)

- 게시글/댓글/프로필은 IndexedDB에 저장합니다.
- TanStack Query는 서버 호출 대신 IndexedDB 기반 API 함수(queryFn/mutationFn) 를 호출하고,  
invalidateQueries로 화면을 갱신합니다.

**구조 요약**

```bash
UI (React)
  -> TanStack Query (cache / invalidate)
    -> api/*.js (DEMO: IndexedDB / PROD: Supabase)
      -> IndexedDB (idb)
```

### 3-3) 데모 데이터 초기화

데모 모드에서 “데모 데이터 초기화” 버튼은 다음을 수행합니다.

- IndexedDB store clear
- localStorage 세션 삭제(bm_guest_session)
- TanStack Query 캐시 무효화

---

## 4. Data Model (Schema)

> 전체 스키마/마이그레이션 문서: `/docs/schema.md`

요약:

users: 
{ id, nickname, favorite, image_url, createdAt, updatedAt }

posts: 
{ id, title, content, address, image_url, is_recruit, coordinate, createdAt, authorId }

comments: 
{ id, postId, authorId, content, writer, image_url, createdAt }

---

## 5. Migration Notes (DB Versioning)

IndexedDB는 스키마 변경 시 버전업이 필요합니다.

- DB_NAME: `boardmate-demo`
- DB_VERSION: (프로젝트의 `src/demo/db.js` 기준)

버전별 변경 요약은 `/docs/schema.md`에 정리되어 있습니다.

---

## 6. Key Features (주요 기능)

- 장소 검색/선택 (Kakao Map) - 게시글 작성 / 수정시
- 게시글 CRUD (데모: IndexedDB 저장)
- 댓글 CRUD (데모: IndexedDB 저장)
- 권한 처리
    - 게시글/댓글: 작성자만 수정/삭제 가능
- 프로필 수정
    - 닉네임 / 좋아하는 게임 / 프로필 이미지

---

## 7. Known Issues / Limitations

- IndexedDB 데이터는 브라우저 단위로 저장되어 기기/브라우저 간 공유되지 않습니다.
- Kakao JS 키는 클라이언트에서 사용되므로 네트워크 요청에서 확인 가능합니다.
    - 대신 도메인 제한 설정으로 악용 가능성을 줄입니다.
- 지도 SDK가 준비되기 전에는 검색/마커 기능이 동작하지 않을 수 있습니다.
    - 권장: SDK 로더(kakaoMapApiLoader) 기반 “ready 이후 렌더” 패턴 적용

---

## 8. Tech Stack & Architecture

`React.js`, `Redux Toolkit`, `styled-components`, `TanStack Query`, `IndexedDB` + `idb`, `Kakao Maps (react-kakao-maps-sdk)`

---

## 9. Folder Structure (요약)

`src/demo/db.js`
- IndexedDB 스키마/버전업/마이그레이션 정의

`src/api/*`

- api.auth.js: 게스트 세션 + users upsert
- api.posts.js: posts CRUD + 이미지 처리(데모: x)
- api.comments.js: comments CRUD

`src/pages/*`
- 페이지/컴포넌트

---

## 10. Conventions

DB_VERSION 변경 시:  
db.js의 upgrade 로직에 버전별 목적을 주석으로 추가

`/docs/schema.md`의 “DB_VERSION별 upgrade” 섹션도 함께 업데이트 권장

---

<br>

## 페이지 미리보기 (MVP 당시 supabase 사용 PROD)

#### 메인

<img src="https://github.com/team-just-do-that/team-project/assets/152875407/4b7e6c91-dd60-4514-9809-83c28eef3752" width="600"/>
<img src="https://github.com/team-just-do-that/team-project/assets/152875407/641e10c5-40a7-4342-bd14-0656d5d8fe48" width="600"/>

#### 회원가입

<img src="https://github.com/team-just-do-that/team-project/assets/152875407/d06d2b1f-dc0a-47bc-be63-aa17ee2db4a0" width="600"/>

#### 로그인

<img src="https://github.com/team-just-do-that/team-project/assets/152875407/13d21e71-c345-43e0-94fc-4d34fcb1f61f" width="600"/>

#### 마이페이지 / 수정

<img src="https://github.com/team-just-do-that/team-project/assets/152875407/b4128852-e5e7-49c7-a629-d6577ddfb481" width="600"/>
<img src="https://github.com/team-just-do-that/team-project/assets/152875407/fcaea70c-cd13-49a5-83f0-83cf028efa80" width="600"/>

#### 글 작성

<img src="https://github.com/team-just-do-that/team-project/assets/152875407/8f0b3e65-d069-4378-881a-fca8e162c766" width="600"/>
<img src="https://github.com/team-just-do-that/team-project/assets/152875407/a94bcf40-4ccf-4205-b2ab-0011867f6476" width="600"/>

#### 게시글 상세페이지

<img src="https://github.com/team-just-do-that/team-project/assets/152875407/6d73a245-eace-4bcb-a548-5bc99c0b916b" width="600"/>
<img src="https://github.com/team-just-do-that/team-project/assets/152875407/b6738844-2af7-4c2b-88df-c60ee4d4730c" width="600"/>
