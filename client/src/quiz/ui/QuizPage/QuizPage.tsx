import { useEffect } from 'react';
import { PageLayout } from '../../../shared/ui/PageComponents/PageLayout/PageLayout';
import { QuizContent } from '../QuizContent/QuizContent';
import { QuizHeader } from '../QuizHeader/QuizHeader';
import { useAppDispatch } from '../../../app/store/store.model';
import { thunkStartQuiz } from '../../services/startQuiz';

export const QuizPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(thunkStartQuiz());
    }, []);

    return (
        <PageLayout>
            <QuizHeader />
            <QuizContent />
        </PageLayout>
    );
};
