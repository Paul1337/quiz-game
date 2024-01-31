import { useAuth } from '../../../auth/hooks/useAuth';
import { Role } from '../../../auth/slices/userSlice.model';
import { AdminButton } from '../../../shared/ui/Buttons/Navigation/AdminButton/AdminButton';
import { LogoutButton } from '../../../shared/ui/Buttons/Navigation/LogoutButton/LogoutButton';
import { ProfileButton } from '../../../shared/ui/Buttons/Navigation/ProfileButton/ProfileButton';
import { PageHeader } from '../../../shared/ui/PageComponents/PageHeader/PageHeader';

export const MenuNav = () => {
    const { roles } = useAuth();
    return (
        <PageHeader>
            <h1 className='text-main text-2xl ml-2'>
                <span className='font-medium hidden md:inline-block'>Simple Quiz: викторина</span>
                <span className='font-medium md:hidden'>Simple Quiz</span>
            </h1>
            <div className='flex items-center gap-2'>
                <ProfileButton fill='#656663' />
                {roles.includes(Role.Admin) && <AdminButton />}
                <LogoutButton />
            </div>
        </PageHeader>
    );
};
