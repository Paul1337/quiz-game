import { PageLayout } from '../../../shared/ui/PageComponents/PageLayout/PageLayout';
import { ProfileContent } from '../ProfileContent/ProfileContent';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader';

export const ProfilePage = () => {
    return (
        <PageLayout>
            <ProfileHeader />
            <ProfileContent />
        </PageLayout>
    );
};
