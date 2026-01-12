import { clearSession } from '@/api/auth-demo/sessionStorage';
import { getDemoDB } from '@/demo/db';

export async function resetDemoData() {
  clearSession();

  const db = await getDemoDB();
  const tx = db.transaction(['users', 'posts', 'comments'], 'readwrite');

  await Promise.all([
    tx.objectStore('users').clear(),
    tx.objectStore('posts').clear(),
    tx.objectStore('comments').clear()
  ]);

  await tx.done;
}
