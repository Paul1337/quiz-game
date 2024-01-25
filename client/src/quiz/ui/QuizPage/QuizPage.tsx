import { PageLayout } from '../../../shared/ui/PageComponents/PageLayout/PageLayout';
import { useQuiz } from '../../hooks/useQuiz';
import { QuizContent } from '../QuizContent/QuizContent';
import { QuizHeader } from '../QuizHeader/QuizHeader';

export const QuizPage = () => {
    useQuiz();

    return (
        <PageLayout>
            <QuizHeader />
            <QuizContent />
        </PageLayout>
    );
};
