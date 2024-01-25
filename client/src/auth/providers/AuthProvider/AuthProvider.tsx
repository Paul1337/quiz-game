import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { userActions } from '../../../auth/slices/userSlice';
import { useAppDispatch } from '../../../app/store/store.model';
import { thunkCheckAuth } from '../../services/checkAuth';
import { UserDataScheme } from '../../slices/userSlice.model';
import { thunkGetProfileData } from '../../services/getProfileData';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(thunkCheckAuth())
            .unwrap()
            .then((data: UserDataScheme) => {
                console.log('data', data);
                setAuthLoading(false);
                dispatch(userActions.setUserData(data));
                dispatch(userActions.setAuthed(true));
                dispatch(thunkGetProfileData());
            })
            .catch(err => {
                setAuthLoading(false);
                dispatch(userActions.setAuthed(false));
            });
    }, []);

    return <>{authLoading ? '' : children}</>;
};
