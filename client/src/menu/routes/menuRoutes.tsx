import { PrivateRoute } from '../../auth/lib/PrivateRoute';
import { AllRoles } from '../../auth/slices/userSlice.model';
import { MenuPage } from '../ui/MenuPage/MenuPage';

export const MenuRotes = {
    Menu: '/',
};

export const menuRoutesList = [
    {
        path: MenuRotes.Menu,
        element: (
            <PrivateRoute roles={AllRoles}>
                <MenuPage />
            </PrivateRoute>
        ),
    },
];
