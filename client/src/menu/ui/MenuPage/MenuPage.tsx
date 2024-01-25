import { PageLayout } from '../../../shared/ui/PageComponents/PageLayout/PageLayout';
import { MenuContent } from '../MenuContent/MenuContent';
import { MenuNav } from '../MenuNav/MenuNav';

export const MenuPage = () => {
    return (
        <PageLayout>
            <MenuNav />
            <MenuContent />
        </PageLayout>
    );
};
