import { LoginPage } from '../ui/LoginPage/LoginPage';
import { RegPage } from '../ui/RegPage/RegPage';

export const AuthRoutes = {
    Reg: '/auth/reg',
    Login: '/auth/login',
};

export const authRoutesList = [
    {
        path: AuthRoutes.Reg,
        element: <RegPage />,
    },
    {
        path: AuthRoutes.Login,
        element: <LoginPage />,
    },
];
