import { DEMO_MODE } from '@/config/demoMode';
import { getDemoDB, newId } from '@/demo/db';

/** supabase는 데모 모드에서 제거될 수도 있으니 동적 import */
let _supabase = null;
async function getSupabase() {
  if (_supabase) return _supabase;
  const mod = await import('@/supabase/supabaseClient');
  _supabase = mod.default;
  return _supabase;
}

/** ---------- Demo session (localStorage) ---------- */
const SESSION_KEY = 'bm_guest_session';

function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

const FALLBACK_AVATAR = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
  <rect width="120" height="120" fill="#e9eef5"/>
  <circle cx="60" cy="50" r="22" fill="#c8d3e0"/>
  <path d="M20 110c8-22 28-34 40-34s32 12 40 34" fill="#c8d3e0"/>
</svg>
`)}`;

function pickNickname(inputData) {
  // 데모에서 nickname 중심, 혹시 기존 호출이 email/password로 남아있어도 깨지지 않게 보정
  const nick = (inputData?.nickname || '').trim();
  if (nick) return nick;

  const email = (inputData?.email || '').trim();
  if (email && email.includes('@')) return email.split('@')[0];

  return '';
}

async function ensureDemoUser({ userId, nickname }) {
  const db = await getDemoDB();
  const prev = await db.get('users', userId);

  if (!prev) {
    const now = Date.now();
    const user = {
      id: userId,
      nickname: nickname || '게스트',
      image_url: FALLBACK_AVATAR,
      favorite: '',
      created_at: new Date(now).toISOString(),
      updated_at: new Date(now).toISOString()
    };
    await db.put('users', user);
    return user;
  }

  // 닉네임이 바뀌었으면 반영
  if (nickname && prev.nickname !== nickname) {
    const next = {
      ...prev,
      nickname,
      updated_at: new Date().toISOString()
    };
    await db.put('users', next);
    return next;
  }

  // 이미지 없으면 fallback 보정
  if (!prev.image_url) {
    const next = { ...prev, image_url: FALLBACK_AVATAR };
    await db.put('users', next);
    return next;
  }

  return prev;
}

async function demoGuestLogin(inputData) {
  const nickname = pickNickname(inputData);
  if (!nickname) throw new Error('닉네임을 입력해주세요.');

  const userId = newId();
  const now = Date.now();

  // session 저장
  const session = { userId, nickname, issuedAt: now };
  saveSession(session);

  // users store upsert
  const user = await ensureDemoUser({ userId, nickname });

  // supabase auth의 data 느낌만 흉내 (컴포넌트에서 result 찍을 때 깨지지 않게)
  return {
    session,
    user,
    data: { user: { id: userId }, session: { user: { id: userId } } }
  };
}

/**
 * 회원가입기능 (이름 유지)
 * - DEMO_MODE: nickname 기반 "게스트 계정 생성 + 세션 저장"
 * - PROD: supabase.auth.signUp
 */
export const signUpWithSupabase = async (inputData) => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.signUp(inputData);
    if (error) throw error;
    return data;
  }

  const result = await demoGuestLogin(inputData);
  return result.data;
};

/**
 * 로그인기능 (이름 유지)
 * - DEMO_MODE: nickname 기반 "게스트 로그인"
 * - PROD: supabase.auth.signInWithPassword
 */
export const signInWithSupabase = async (inputData) => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword(inputData);
    if (error) throw error;
    return data;
  }

  const result = await demoGuestLogin(inputData);
  return result.data;
};

export const signOutWithSupabase = async () => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return;
  }

  clearSession();
};

/**
 * loader / route guard / header에서 일관되게 쓰기 위해
 * getSessionWithSupabase는 항상 `{ session }` 형태로 반환
 */
export const getSessionWithSupabase = async () => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    // supabase의 session 객체를 그대로
    return { session: data?.session ?? null };
  }

  const session = loadSession();
  return {
    // demo 세션도 guard에서 쓰기 좋게 session.user.id 형태를 흉내
    session: session ? { user: { id: session.userId }, nickname: session.nickname } : null
  };
};

/**
 * 프로필 생성/저장 (이름 유지)
 * - DEMO_MODE: 현재 session.userId로 users store upsert
 * - PROD: supabase.from('users').insert(profileData)
 */
export const createProfileWithSupabase = async (profileData) => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data: result, error } = await supabase.from('users').insert(profileData);
    if (error) throw error;
    return result;
  }

  const session = loadSession();
  if (!session) throw new Error('로그인이 필요합니다.');

  const user = await ensureDemoUser({ userId: session.userId, nickname: session.nickname });
  const next = {
    ...user,
    ...profileData,
    updated_at: new Date().toISOString()
  };

  const db = await getDemoDB();
  await db.put('users', next);
  return next;
};

export const updateProfileWithSupabase = async (profileData, id) => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data: result, error } = await supabase.from('users').update(profileData).eq('id', id);
    if (error) throw error;
    return result;
  }

  const db = await getDemoDB();
  const prev = await db.get('users', id);
  if (!prev) throw new Error('유저가 존재하지 않습니다.');

  const patch = { ...profileData };

  if (Object.prototype.hasOwnProperty.call(patch, 'favorite')) {
    const v = patch.favorite;

    if (typeof v === 'string') {
      patch.favorite = v; // 그대로
    } else if (Array.isArray(v)) {
      patch.favorite = v.join(', ');
    } else if (v == null) {
      // null/undefined면 빈 문자열로
      patch.favorite = '';
    } else {
      patch.favorite = String(v);
    }

    patch.favorite = patch.favorite.trim();
  }

  // nickname 공백 보정
  if (Object.prototype.hasOwnProperty.call(patch, 'nickname') && typeof patch.nickname === 'string') {
    patch.nickname = patch.nickname.trim();
  }

  const next = {
    ...prev,
    ...patch,
    id: prev.id,
    favorite: Object.prototype.hasOwnProperty.call(patch, 'favorite') ? patch.favorite : prev.favorite ?? '',
    updated_at: new Date().toISOString()
  };

  await db.put('users', next);
  return next;
};

/**
 * 현재 로그인 유저 조회 (MyPage에서 사용)
 * - DEMO_MODE: localStorage session -> users store 조회
 * - PROD: supabase.auth.getUser + users 테이블 조회
 */
export const getUser = async () => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;

    if (!data?.user?.id) return null;

    const { data: user, error: userError } = await supabase.from('users').select('*').eq('id', data.user.id).single();

    if (userError) throw userError;
    return user;
  }

  const session = loadSession();
  if (!session) return null;

  const user = await ensureDemoUser({ userId: session.userId, nickname: session.nickname });
  return user;
};
