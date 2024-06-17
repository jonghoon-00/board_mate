import WritingForm from '@/components/WritingForm';
import FeedWrite from '@/pages/FeedWrite/FeedWrite';
import { Home } from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  { path: '/writingpage', element: <FeedWrite /> }
]);
