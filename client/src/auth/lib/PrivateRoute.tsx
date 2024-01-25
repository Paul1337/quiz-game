import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { NotAllowed } from '../../shared/ui/NotAllowed/NotAllowed';
import { useAuth } from '../hooks/useAuth';
import { AuthRoutes } from '../routes/authRoutes';
import { Role } from '../slices/userSlice.model';

interface PrivateRouteProps {
    children: ReactNode;
    roles?: Role[];
}

export const PrivateRoute: FC<PrivateRouteProps> = props => {
    const { roles = [], children } = props;
    const { isAuthed, roles: userRoles } = useAuth();

    if (!isAuthed) {
        return <Navigate to={AuthRoutes.Login} />;
    } else if (userRoles.some(role => roles.includes(role))) {
        return <>{children}</>;
    } else {
        return <NotAllowed />;
    }
};
