import { FC } from 'react';
import HomeLogo from '../../../../assets/logout3.svg?react';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch } from '../../../../../app/store/store.model';
import { userActions } from '../../../../../auth/slices/userSlice';
import { authLocalStore } from '../../../../../auth/local-store/authLocalStore';

interface LogoutButtonProps {
    className?: string;
}

export const LogoutButton: FC<LogoutButtonProps> = props => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(userActions.setAuthed(false));
        authLocalStore.setAuthToken('null');
    };

    return (
        <HomeLogo
            className={twMerge('block w-8 h-8 bg-cover bg-center cursor-pointer hover:opacity-80', className)}
            onClick={handleClick}
        ></HomeLogo>
    );
};
