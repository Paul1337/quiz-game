import { HomeButton } from '../../../shared/ui/Buttons/Navigation/HomeButton/HomeButton';
import { LogoutButton } from '../../../shared/ui/Buttons/Navigation/LogoutButton/LogoutButton';
import { PageHeader } from '../../../shared/ui/PageComponents/PageHeader/PageHeader';

export const ProfileHeader = () => {
    return (
        <PageHeader className='p-4'>
            <HomeButton />
            <LogoutButton />
        </PageHeader>
    );
};
