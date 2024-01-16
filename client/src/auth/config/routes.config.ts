export const authRoutes = {
    Prefix: '/auth',
    LoginPage: 'login',
    RegPage: 'reg',
};

export const authFullRoutes = {
    LoginPage: authRoutes.Prefix.concat('/', authRoutes.LoginPage),
    RegPage: authRoutes.Prefix.concat('/', authRoutes.RegPage),
};
