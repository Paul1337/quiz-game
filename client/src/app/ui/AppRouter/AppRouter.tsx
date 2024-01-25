import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { menuRoutesList } from '../../../menu/routes/menuRoutes';
import { quizRoutesList } from '../../../quiz/routes/quizRoutes';
import { AuthRoutes, authRoutesList } from '../../../auth/routes/authRoutes';
import { profileRoutesList } from '../../../profile/routes/profileRoutes';
import { adminRoutesList } from '../../../admin/routes/adminRoutes';

const router = createBrowserRouter([
    ...authRoutesList,
    ...quizRoutesList,
    ...menuRoutesList,
    ...profileRoutesList,
    ...adminRoutesList,
    {
        path: '*?',
        element: <Navigate to={AuthRoutes.Login} />,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
