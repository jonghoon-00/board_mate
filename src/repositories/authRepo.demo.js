import { saveSession } from '@/auth/sessionStorage';
import { getDemoDB, newId } from '@/demo/db';

export async function guestLogin(nickname) {
  const trimmed = (nickname || '').trim();
  if (!trimmed) throw new Error('닉네임을 입력해주세요.');

  const db = await getDemoDB();
  const userId = newId();
  const now = Date.now();

  await db.put('users', { id: userId, nickname: trimmed, createdAt: now });

  const session = { userId, nickname: trimmed, issuedAt: now };
  saveSession(session);

  return session;
}
