import { PrivateRoute } from '../../auth/lib/PrivateRoute';
import { AllRoles } from '../../auth/slices/userSlice.model';
import { QuizPage } from '../ui/QuizPage/QuizPage';

export const QuizRoutes = {
    Quiz: '/quiz',
};

export const quizRoutesList = [
    {
        path: QuizRoutes.Quiz,
        element: (
            <PrivateRoute roles={AllRoles}>
                <QuizPage />
            </PrivateRoute>
        ),
    },
];
