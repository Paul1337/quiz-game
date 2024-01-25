import { HomeButton } from '../../../shared/ui/Buttons/Navigation/HomeButton/HomeButton';
import { PageHeader } from '../../../shared/ui/PageComponents/PageHeader/PageHeader';
import { PageLayout } from '../../../shared/ui/PageComponents/PageLayout/PageLayout';
import { AddQuestionForm } from '../AddQuestionForm/AddQuestionForm';

export const AdminPage = () => {
    return (
        <PageLayout className='flex flex-col h-full'>
            <PageHeader>
                <HomeButton />
                <span className='text-main font-medium'>Админка</span>
            </PageHeader>
            <div className='bg-second-bg m-2 p-2 flex-1 min-h-0'>
                <AddQuestionForm />
            </div>
        </PageLayout>
    );
};
