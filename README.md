# :game_die: 보드메이트(Board Mate)


#### 보드게임 참여 인원을 구할 수 있는 지도 커뮤니티


<br>

## :exclamation: 기능
<br>


- 로그인, 회원가입
- 글 작성, 조회, 수정, 삭제
- 댓글기능
- 마이페이지 - 프로필사진 및 최애 보드게임 설정, 본인 게시글 리스팅
<hr>

  - 게시글 작성, 수정시의 위치 지정 : kakao map api 사용
  
  - db: supabase 

<br>



##  :alarm_clock: 작업 기간


#### 24/6/17~24/6/21


<br>

## 페이지 미리보기


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





## 튜터 피드백
<br>

- 전체적인 코드 구조를 아주 잘 짜셨고, 컴포넌트 역할이 명확하게 잘 나뉘어 있습니다.
- 기본적인 커스텀 훅을 사용하려고 하셨는데, tanstack query 부분은 CRUD 부분을 분리하기 가장 좋은 부분 중 하나입니다. 이 부분 연습해보는 것도 나쁘지 않으셨을 것 같습니다.
- alias를 이용해서 절대 경로를 이용한 import한 부분도 멋집니다.
- 현재 여러개의 Provider를 사용하고 있는데, shared 폴더를 만들어서 QueryProvider랑 route를 한 곳에서 관리하는 것은 어떤가 싶습니다.
- Auth 로직, 현재 로그인한 상태 로직이 여러 곳에 분산되어있는데, 중앙화시키면 어떨까 싶습니다.
   - zustand나 redux를 사용하시면 좋겠죠. 혹은 supabase.auth.onauthstatechange를 사용하는 것도 좋았겠습니다.
- 주석 처리된 log 파일들도 지워주시면 좋습니다.
  - 사용 안하는 redux나 App.css 같은 일부 파일들은 삭제하는 편이 좋겠습니다. 비어있는 파일들이 몇개 보입니다. (package.json에서도요!)


<br>



