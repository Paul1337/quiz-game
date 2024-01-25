import { PrivateRoute } from '../../auth/lib/PrivateRoute';
import { AllRoles } from '../../auth/slices/userSlice.model';
import { ProfilePage } from '../ui/ProfilePage/ProfilePage';

export const ProfileRotes = {
    Profile: '/profile',
};

export const profileRoutesList = [
    {
        path: ProfileRotes.Profile,
        element: (
            <PrivateRoute roles={AllRoles}>
                <ProfilePage />
            </PrivateRoute>
        ),
    },
];
