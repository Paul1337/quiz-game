import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { AdminRoutes } from '../../../../../admin/routes/adminRoutes';
import AdminLogo from '../../../../assets/admin-logo.svg?react';

interface AdminButtonProps {
    className?: string;
}

export const AdminButton: FC<AdminButtonProps> = props => {
    const { className } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(AdminRoutes.AdminPage);
    };

    return (
        <AdminLogo
            className={twMerge('block w-8 h-8 bg-cover bg-center cursor-pointer hover:opacity-80', className)}
            onClick={handleClick}
        />
    );
};
