import { useAppSelector } from '../../../app/store/store.model';
import { QuizError } from '../../slices/quizSlice.model';

const errorsTranslation: Record<QuizError, string> = {
    [QuizError.Unknown]: 'Неизвестная ошибка',
    [QuizError.NoQuestion]: 'Не нашлось вопроса. Видимо вы уже на всё ответили (',
};

export const QuizErrorView = () => {
    const error = useAppSelector(state => state.quiz.quizError!);

    return (
        <div className='flex justify-center m-2'>
            <p className='text-red-700 font-medium text-lg'>{errorsTranslation[error]}</p>
        </div>
    );
};
