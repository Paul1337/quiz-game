import { PrivateRoute } from '../../auth/lib/PrivateRoute';
import { Role } from '../../auth/slices/userSlice.model';
import { AdminPage } from '../ui/AdminPage/AdminPage';

export const AdminRoutes = {
    AdminPage: '/admin',
};

export const adminRoutesList = [
    {
        path: AdminRoutes.AdminPage,
        element: (
            <PrivateRoute roles={[Role.Admin]}>
                <AdminPage />
            </PrivateRoute>
        ),
    },
];
