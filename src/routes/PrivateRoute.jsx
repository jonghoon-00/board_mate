import { Navigate, useLoaderData } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { session } = useLoaderData();
  const isSession = !!session;
  if (!isSession) return <Navigate to="/log-in" />;
  return <>{children}</>;
};
