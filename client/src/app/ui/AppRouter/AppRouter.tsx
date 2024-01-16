import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../../../auth/ui/LoginPage/LoginPage';
import { RegPage } from '../../../auth/ui/RegPage/RegPage';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { authFullRoutes, authRoutes } from '../../../auth/config/routes.config';
import { menuFullRoutes } from '../../../menu/config/routes.config';
import { MenuPage } from '../../../menu/ui/MenuPage/MenuPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                path: menuFullRoutes.MenuPage,
                element: <MenuPage />,
            },
        ],
    },
    {
        path: authRoutes.Prefix,
        children: [
            {
                path: authRoutes.RegPage,
                element: <RegPage />,
            },
            {
                path: authRoutes.LoginPage,
                element: <LoginPage />,
            },
            {
                path: '*?',
                element: <Navigate to={authFullRoutes.LoginPage} />,
            },
        ],
    },
    {
        path: '*?',
        element: <Navigate to={authFullRoutes.LoginPage} />,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
