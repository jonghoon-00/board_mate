import Layout from '@/Layouts/Layout';
import CrudTest from '@/pages/CrudTest/CrudTest';
import { Home } from '@/pages/Home';
import { Children } from 'react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '', element: <Home /> }]
  },
  {
    path: '/crudtest',
    element: <CrudTest />
  }
]);
