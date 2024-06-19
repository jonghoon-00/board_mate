import Layout from '@/Layouts/Layout';
import { getSessionWithSupabase } from '@/api/api.auth';
import FeedWrite from '@/pages/FeedWrite/FeedWrite';
import { Home } from '@/pages/Home';
import { LogIn } from '@/pages/LogIn';
import { SignUp } from '@/pages/SignUp/SignUp';
import Detail from '@/pages/detail/Detail';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  { path: '', element: <Home /> },
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
      }
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
  }
    element: <Layout />,

    children: [
      { path: '', element: <Home /> },
      {
        path: 'detail/:id',
        element: <Detail />
      },
      { path: '/writingpage', element: <FeedWrite /> }
    ]
  }
]);
