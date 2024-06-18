import FeedWrite from '@/pages/FeedWrite/FeedWrite';
import Layout from '@/Layouts/Layout';
import { Home } from '@/pages/Home';
import Detail from '@/pages/detail/Detail';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
<<<<<<< HEAD
    children: [
      { path: '', element: <Home /> },
      {
        path: 'detail/:id',
        element: <Detail />
      }
    ]
  }
=======
    children: [{ path: '', element: <Home /> }]
  },
  { path: '/writingpage', element: <FeedWrite /> }
>>>>>>> d442b642b40e74a3a74bd6baf47c262bbea27b66
]);
