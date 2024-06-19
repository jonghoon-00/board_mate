import Layout from '@/Layouts/Layout';
import { getSessionWithSupabase } from '@/api/api.auth';
import CrudTest from '@/pages/CrudTest/CrudTest';
import { FeedWrite } from '@/pages/FeedWrite/FeedWrite';
import { Home } from '@/pages/Home';
import { LogIn } from '@/pages/LogIn';
import { FixMyProfile } from '@/pages/MyPage/FixMyProfile';
import { MyPage } from '@/pages/MyPage/MyPage';
import { SelectPlace } from '@/pages/SelectPlace';
import { SignUp } from '@/pages/SignUp/SignUp';
import { Detail } from '@/pages/detail';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      }
    ]
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'my-page',
        element: <MyPage />
      },
      {
        path: 'detail/:id',
        element: <Detail />
      },
      {
        path: 'fix-my-profile',
        element: <FixMyProfile />
      },

      { path: 'select-place', element: <SelectPlace /> },
      { path: 'writingpage', element: <FeedWrite /> }
    ],
    loader: getSessionWithSupabase
  },

  {
    path: '/',
    element: (
      <PublicRoute>
        <Layout />
      </PublicRoute>
    ),
    children: [
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'log-in',
        element: <LogIn />
      }
    ],
    loader: getSessionWithSupabase
  },
  {
    path: '/crudtest',
    element: <CrudTest />
  }
]);
