import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store.model';
import { userActions } from '../../../auth/slices/userSlice';

export const LoadingProvider: FC<PropsWithChildren> = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // check auth state
        setAuthLoading(false);
        dispatch(userActions.setAuthed(true));
    }, []);

    return <>{authLoading ? '' : children}</>;
};
