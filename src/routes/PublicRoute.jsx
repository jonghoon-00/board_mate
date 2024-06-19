import { Navigate, useLoaderData } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { session } = useLoaderData();
  console.log(session);
  const isSession = !!session;
  if (isSession) return <Navigate to="/" />;
  return <>{children}</>;
};
