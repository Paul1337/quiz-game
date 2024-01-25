import { useAppDispatch, useAppSelector } from '../../../app/store/store.model';
import { PlayButton } from '../../../shared/ui/Buttons/Button/PlayButton';
import { thunkStartQuiz } from '../../services/startQuiz';
import { EndQuizReason } from '../../slices/quizSlice.model';

const EndReasonDesciptor: Record<EndQuizReason, string> = {
    [EndQuizReason.AllAnswered]: 'Вы ответили на все вопросы',
    [EndQuizReason.NoQuestion]: 'Вы ответили на все вопросы, которые были в игре на данный момент',
    [EndQuizReason.RoundFailure]: 'Вы проиграли',
    [EndQuizReason.Timedout]: 'Время вышло',
    [EndQuizReason.Error]:
        'Какая-то ошибка. Хотя в этом случае по идее страница ошибки должна была зарендериться',
};

export const FinishedContent = () => {
    const quizStat = useAppSelector(state => state.quiz.stat);
    const endReason = useAppSelector(state => state.quiz.endReason!);
    const dispatch = useAppDispatch();
    const { mistakesCount, points, stage } = quizStat;

    const handlePlayAgainClick = () => {
        dispatch(thunkStartQuiz());
    };

    return (
        <div className='flex-1'>
            <p className='text-center text-xl m-2'>Конец игры! ({EndReasonDesciptor[endReason]})</p>
            {/* <p className='text-center text-xl m-2'></p> */}
            <div>
                <p className='font-medium text-center text-green-700 text-lg'>
                    Заработано баллов: {points}
                </p>
                <div className='text-center mt-4 '>
                    <PlayButton className='w-[80%]' onClick={handlePlayAgainClick}>
                        Сыграть ещё
                    </PlayButton>
                </div>
            </div>
        </div>
    );
};
