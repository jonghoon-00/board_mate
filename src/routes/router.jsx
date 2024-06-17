import WritingForm from '@/components/WritingForm';
import FeedWrite from '@/pages/FeedWrite/FeedWrite';
import Layout from '@/Layouts/Layout';
import { Home } from '@/pages/Home';
import { Children } from 'react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',

    element: <Layout />,
    children: [{ path: '', element: <Home /> }]
  },
  { path: '/writingpage', element: <FeedWrite /> }
]);
