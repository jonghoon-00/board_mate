import { Navigate, useLoaderData } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const data = useLoaderData();
  const session = data?.session ?? null;

  if (session) return <Navigate to="/" replace />;
  return <>{children}</>;
};
