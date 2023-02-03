import { CircularProgress } from '@mui/material';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthCtx';
import { useDataContext } from './IncommingOrderContext';
import './style.css';

// This component will only check if the user is logged in
const RequireAuth = () => {
  const context = useDataContext();
  const location = useLocation();
  const { user, loading } = useAuth();

  // Loading view
  if (loading) {
    return (
      <div className='loading'>
        <CircularProgress />
      </div>
    );
  }

  // If the user is not logged in, it will be redirected to the login view
  return user && context.userToken ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} state={{ from: location }} replace />
  );
};

export default RequireAuth;
