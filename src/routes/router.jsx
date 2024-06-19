import Layout from '@/Layouts/Layout';
import CrudTest from '@/pages/CrudTest/CrudTest';
import { getSessionWithSupabase } from '@/api/api.auth';
import { Home } from '@/pages/Home';
import { LogIn } from '@/pages/LogIn';
import { SelectPlace } from '@/pages/SelectPlace';
import { SignUp } from '@/pages/SignUp/SignUp';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
<<<<<<< HEAD
import MyPage from '@/pages/MyPage/MyPage';
import FixMyProfile from '@/pages/MyPage/FixMyProfile';
=======
import { FeedWrite } from '@/pages/FeedWrite/FeedWrite';
import { Detail } from '@/pages/detail';
>>>>>>> 51f1a3ad590addbfc2d1eb1f3a6e608ce9bf06f4

export const router = createBrowserRouter([
  { path: '', element: <Home /> },
  { path: '/select-place', element: <SelectPlace /> },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
<<<<<<< HEAD
        path: 'my-page',
        element: <MyPage />
=======
        path: 'my-page'
        // element: <MyPage />
>>>>>>> 51f1a3ad590addbfc2d1eb1f3a6e608ce9bf06f4
      },
      {
        path: 'detail/:id',
        element: <Detail />
      },
      {
<<<<<<< HEAD
        path: 'fix-my-profile',
        element: <FixMyProfile />
      }
=======
        path: 'fix-my-profile'
        // element: <FixMyProfile />
      },
      { path: 'writingpage', element: <FeedWrite /> }
>>>>>>> 51f1a3ad590addbfc2d1eb1f3a6e608ce9bf06f4
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
