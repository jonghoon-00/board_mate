import Layout from '@/Layouts/Layout';
import { Home } from '@/pages/Home';
import FixMyProfile from '@/pages/Mypage/FixMyProfile';
import MyPage from '@/pages/Mypage/MyPage';
import { Children } from 'react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '', element: <Home /> }]
  },
  { path: '/my-page', element: <MyPage /> },
  { path: '/fix-my-profile', element: <FixMyProfile /> }
]);
