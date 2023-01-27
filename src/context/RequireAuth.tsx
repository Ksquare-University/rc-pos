import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthCtx';
import { useDataContext } from './IncommingOrderContext';

const RequireAuth = () => {
  const context = useDataContext();
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading ....</h1>;
  }

  return user && context.userToken ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} state={{ from: location }} replace />
  );
};

export default RequireAuth;
