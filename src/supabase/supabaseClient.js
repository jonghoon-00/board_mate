import { createClient } from '@supabase/supabase-js';

// const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
// const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;

const SUPABASE_PROJECT_URL="https://dummy-url-for-portfolio.com"
const SUPABASE_ANON_KEY="dummy-anon-key"


let supabase;

if (!SUPABASE_PROJECT_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[Supabase Mock Mode] 환경변수가 없어 Supabase를 비활성화한 채 UI만 렌더링합니다."
  );

   // supabase 객체 대신, 메서드가 있어도 항상 빈 값만 반환하는 mock
 supabase = {
    from() {
      return {
        select: async () => ({ data: [], error: null }),
        insert: async () => ({ data: [], error: null }),
        update: async () => ({ data: [], error: null }),
        delete: async () => ({ data: [], error: null }),
      };
    },
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
    },
  };
} else {
  // 정상 모드
  supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_PROJECT_URL);
}

export default supabase;
