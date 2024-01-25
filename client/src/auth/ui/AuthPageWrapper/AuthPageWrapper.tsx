import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { MenuRotes } from '../../../menu/routes/menuRoutes';
import { useAuth } from '../../hooks/useAuth';

export const AuthPageWrapper: FC<PropsWithChildren> = ({ children }) => {
    const { isAuthed } = useAuth();
    return isAuthed ? <Navigate to={MenuRotes.Menu} /> : <>{children}</>;
};
