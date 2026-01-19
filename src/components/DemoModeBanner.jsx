import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { DEMO_MODE } from '@/config/demoMode';
import { resetDemoData } from '@/demo/reset';

const Wrap = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: rgba(20, 20, 20, 0.92);
  color: #fff;
  backdrop-filter: blur(8px);
`;

const Text = styled.div`
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  opacity: 0.95;
`;

const Button = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

export function DemoModeBanner() {
  const qc = useQueryClient();

  if (!DEMO_MODE) return null;

  const onReset = async () => {
    const ok = window.confirm('데모 데이터를 초기화할까요?\n(브라우저에 저장된 게시글/댓글/유저/세션이 삭제됩니다.)');
    if (!ok) return;

    await resetDemoData();

    // Query 캐시도 함께 초기화해서 UI가 즉시 반영되게
    qc.clear();

    // 가장 확실한 초기화(데모 안정성)
    window.location.reload();
  };

  return (
    <Wrap>
      <Text>DEMO MODE · 입력 데이터는 브라우저에 저장됩니다 · 로그아웃 시 유저정보는 저장되지 않습니다</Text>
      <Button onClick={onReset}>데모 데이터 초기화</Button>
    </Wrap>
  );
}
