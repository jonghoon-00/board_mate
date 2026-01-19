import { useKakaoLoader } from 'react-kakao-maps-sdk';

export default function KakaoLoaderGate({ children }) {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JS_KEY,
    libraries: ['services', 'clusterer', 'drawing']
  });

  if (error) {
    console.error('카카오 SDK 로딩 실패');
  }
  // if (loading) return <div>지도 로딩 중...</div>;
  return children;
}
