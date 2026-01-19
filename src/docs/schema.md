# BoardMate Demo DB Schema (IndexedDB)

이 문서는 BoardMate를 **Supabase → IndexedDB(idb) 기반 데모/목업 모드로 전환**하면서 사용되는
로컬 DB 스키마(= 데이터 계약)를 정의합니다.

> `config/demoMode.js`의 DEMO_MODE 값을 false로 변경 이후 supabase 키 연결시, 
> supabase에서도 작동되도록 제작되어있습니다.

- 저장소: 브라우저 IndexedDB (`idb` 라이브러리로 래핑)
- DB 이름: `boardmate-demo`
- 세션: localStorage (게스트 로그인 세션)
- 스키마는 “정식(canonical)” 필드를 기준으로 정의하며,
  과거 Supabase 컬럼/혼재(snake_case/camelCase) 필드는 마이그레이션에서 흡수합니다.

---

## 0. 저장 위치/키

### IndexedDB
- DB_NAME: `boardmate-demo`
- Object Stores: `users`, `posts`, `comments`

### localStorage
- `bm_guest_session`
  - `{ userId, nickname, issuedAt }`

> 데모 모드에서 “로그인 상태”는 서버 세션이 아닌 **localStorage + IndexedDB(users)** 조합으로 관리합니다.

---

## 1. Object Store: `users`

### 1-1) 정식 스키마 (Canonical)

| 필드명 | 타입 | 필수 | 의미 | 제약/규칙 |
|---|---|---:|---|---|
| `id` | `string` | ✅ | 유저 고유 ID | `crypto.randomUUID()` 기반, keyPath |
| `nickname` | `string` | ✅ | 닉네임 | trim된 문자열 권장, 빈 값 금지 권장 |
| `favorite` | `string` | ⛔️ | 좋아하는 게임/취향 | 현재는 string(단일 문자열) |
| `image_url` | `string \| null` | ⛔️ | 프로필 이미지 | 데모 모드에서는 `dataURL` 가능, 프로덕션에서는 public URL |
| `createdAt` | `string` | ⛔️ | 생성 시각(ISO) | 데모에서 필요 시 생성 |
| `updatedAt` | `string` | ⛔️ | 수정 시각(ISO) | 업데이트 시 갱신 권장 |

### 1-2) 인덱스(Index)
- `by-nickname` (keyPath: `nickname`)
  - 목적: 닉네임 기반 검색/중복 검사/정렬 등에 사용

---

## 2. Object Store: `posts`

### 2-1) 정식 스키마 (Canonical)

| 필드명 | 타입 | 필수 | 의미 | 제약/규칙 |
|---|---|---:|---|---|
| `id` | `string` | ✅ | 게시글 ID | keyPath |
| `title` | `string` | ✅ | 제목 | 빈 문자열 금지 권장 |
| `content` | `string` | ✅ | 내용 | 빈 문자열 금지 권장 |
| `address` | `string` | ✅ | 주소(표시용) | 지도 선택 결과로 채움 |
| `image_url` | `string \| null` | ⛔️ | 게시글 이미지 | 데모: dataURL 가능 / PROD: Storage public URL |
| `is_recruit` | `boolean` | ✅ | 모집 여부 | 기본값 `false` |
| `coordinate` | `{ lat: number, lng: number }` | ✅ | 지도 좌표 | 숫자형으로 정규화 |
| `createdAt` | `string` | ✅ | 생성 시각(ISO) | 정렬/페이지네이션 기준 |
| `authorId` | `string \| null` | ✅ | 작성자 ID | 로그인 유저 id, 권한 체크 기준 |

### 2-2) 과거/혼재 필드(Legacy) 흡수 규칙
Supabase 기반 코드가 남아있을 수 있어 아래 혼재를 흡수합니다.

- 작성자:
  - `authorId` ← `authorId` or `user_id` or `userId`
- 생성일:
  - `createdAt` ← `createdAt` or `created_at`
- 좌표:
  - `coordinate.lat/lng`가 문자열로 들어오면 `Number()`로 보정

### 2-3) 인덱스(Index)
- `by-authorId` (keyPath: `authorId`)
  - 목적: 마이페이지(내가 작성한 글) 필터링/조회
- `by-createdAt` (keyPath: `createdAt`)
  - 목적: 최신순 정렬/페이지네이션

---

## 3. Object Store: `comments`

### 3-1) 정식 스키마 (Canonical)  ✅(추천)
comments는 UI와 mutation에서 사용되는 항목을 기반으로 정식 필드를 아래처럼 정의합니다.

| 필드명 | 타입 | 필수 | 의미 | 제약/규칙 |
|---|---|---:|---|---|
| `id` | `string` | ✅ | 댓글 ID | keyPath |
| `postId` | `string` | ✅ | 대상 게시글 ID | 게시글 상세에서 필터링 |
| `authorId` | `string` | ✅ | 작성자 ID | 수정/삭제 권한 기준 |
| `content` | `string` | ✅ | 댓글 내용 | 빈 문자열 금지 권장 |
| `writer` | `string` | ✅ | 작성자 표시명(닉네임 스냅샷) | 유저가 닉네임 변경해도 당시 표시 유지 가능 |
| `image_url` | `string \| null` | ⛔️ | 작성자 프로필 이미지(스냅샷) | fallback 이미지 처리 |
| `createdAt` | `string` | ✅ | 생성 시각(ISO) | 오래된순 표시 등에 사용 |

### 3-2) Supabase 기반 Legacy 필드 흡수 규칙
기존 Supabase 형태가 남아있는 경우를 위해 아래를 흡수합니다.

- `postId` ← `postId` or `post_id`
- `authorId` ← `authorId` or `user_id`
- `createdAt` ← `createdAt` or `created_at`

### 3-3) 인덱스(Index)
현재 db.js(v4) 기준:

- `by-postId` (keyPath: `postId`)
  - 목적: 특정 게시글의 댓글 목록 조회
- `by-authorId` (keyPath: `authorId`)
  - 목적: 내 댓글 조회/권한 검사

> 추천(향후): `by-createdAt` 인덱스를 추가하면 정렬/조회가 더 단순해질것으로 예상

---

## 4. DB_VERSION별 upgrade (마이그레이션)

> 기준 코드: `src/demo/db.js` (DB_NAME: `boardmate-demo`, DB_VERSION: `4`)

### v1
- Object Store 생성
  - `users` (keyPath: `id`)
    - index: `by-nickname` (`nickname`)
  - `posts` (keyPath: `id`)
    - index: `by-authorId` (`authorId`)
    - index: `by-createdAt` (`createdAt`)
  - `comments` (keyPath: `id`)
    - index: `by-postId` (`postId`)
    - index: `by-authorId` (`authorId`)


### v2
- **users 스키마 기본값 보정(마이그레이션)**
  - `nickname/image_url/favorite` 등의 기본값을 보정해 데이터 누락으로 인한 UI 오류를 줄이는 단계

### v3
- **posts 스키마 정규화 + 인덱스 보강**
  - posts store가 이미 존재하는 경우에도 index 누락 가능성을 대비해 아래 인덱스를 보강
    - `by-authorId` (`authorId`)
    - `by-createdAt` (`createdAt`)
  - **마이그레이션 (oldVersion < 3)**: posts 레코드를 canonical 필드로 정규화
    - `title/content/address/image_url/is_recruit` 기본값 보정
    - `coordinate` 보정: `{ lat, lng }`를 `Number()`로 강제, 없으면 `{ lat:0, lng:0 }`
    - `createdAt` 보정: `createdAt ?? created_at ?? nowIso`
    - `authorId` 보정: `authorId ?? user_id ?? userId ?? null`

### v4
- **comments 인덱스(by-createdAt) 추가 + snake/camel 혼재 보정**
  - comments store가 이미 존재하는 경우에도 index 누락 가능성을 대비해 아래 인덱스를 보강
    - `by-postId` (`postId`)
    - `by-authorId` (`authorId`)
    - ✅ `by-createdAt` (`createdAt`) 추가/보강
  - **마이그레이션 (oldVersion < 4)**: comments 레코드를 canonical + legacy 동시 보존 형태로 정규화
    - canonical(내부 정규화) 필드 확정
      - `postId`: `postId ?? post_id ?? null`
      - `authorId`: `authorId ?? user_id ?? null`
      - `createdAt`: `createdAt ?? created_at ?? nowIso`
    - legacy(기존 UI/로직 호환) 필드도 함께 유지
      - `post_id`: 기존 값 없으면 `postId`로 채움
      - `user_id`: 기존 값 없으면 `authorId`로 채움
      - `created_at`: 기존 값 없으면 `createdAt`로 채움
    - UI 표시용 필드 기본값 보정
      - `content`: 기본값 `''`
      - `writer`: 기본값 `''`
      - `image_url`: 기본값 `null`
    - 추가 필드(선택)
      - `updated_at`: 없으면 `createdAt`으로 채움  
        (기존 스키마에 없더라도 데모 DB에서는 추가해도 무방하며, 추후 수정 추적에 활용 가능)

---

## 5. 참고: idb(openDB) 동작 개요

- `openDB(DB_NAME, DB_VERSION, { upgrade })`는
  - 처음 생성 시: `upgrade(db, 0)` 호출
  - 버전 변경 시: `upgrade(db, oldVersion)` 호출
- `upgrade` 콜백 안에서는
  - store 생성/인덱스 생성
  - 데이터 마이그레이션(커서 순회 후 update)
  를 수행할 수 있습니다.
- `db.transaction([...stores], 'readwrite')`는
  - 여러 store를 묶어 atomic하게 작업할 때 사용합니다.
- `store.openCursor()`는
  - store의 모든 레코드를 순회하며 업데이트/삭제할 때 사용합니다.
