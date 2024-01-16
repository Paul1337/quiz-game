import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { menuFullRoutes } from '../../../menu/config/routes.config';

export const AuthPageWrapper: FC<PropsWithChildren> = ({ children }) => {
    const isAuthed = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthed) navigate(menuFullRoutes.MenuPage);
    }, [isAuthed]);

    return <>{children}</>;
};
