import { Navigate, useLoaderData } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const data = useLoaderData();
  const session = data?.session ?? null;

  if (!session) return <Navigate to="/log-in" replace />;
  return <>{children}</>;
};
