import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks/useAuth';
import { authFullRoutes } from '../../../auth/config/routes.config';

export const PrivateRoute = () => {
    const isAuthed = useAuth();
    return isAuthed ? <Outlet /> : <Navigate to={authFullRoutes.LoginPage} />;
};
