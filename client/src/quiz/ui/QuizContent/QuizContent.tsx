import { useAppSelector } from '../../../app/store/store.model';
import { Spinner } from '../../../shared/ui/UtilityComponents/Spinner/Spinner';
import { FinishedContent } from '../FinishedContent/FinishedContent';
import { Question } from '../Question/Question';

export const QuizContent = () => {
    const isLoadingQuestion = useAppSelector(state => state.quiz.isLoadingQuestion);
    const isQuizFinished = useAppSelector(state => state.quiz.isFinished);

    return (
        <div className='flex justify-center min-h-32 bg-second-bg m-2 rounded-md'>
            {isQuizFinished ? (
                <FinishedContent />
            ) : isLoadingQuestion ? (
                <div className='flex justify-center items-center'>
                    <Spinner />
                </div>
            ) : (
                <Question className='w-full' />
            )}
        </div>
    );
};
