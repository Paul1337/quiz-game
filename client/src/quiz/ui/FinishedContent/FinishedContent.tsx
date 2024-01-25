import { useAppDispatch, useAppSelector } from '../../../app/store/store.model';
import { PlayButton } from '../../../shared/ui/Buttons/Button/PlayButton';
import { thunkStartQuiz } from '../../services/startQuiz';

export const FinishedContent = () => {
    const quizStat = useAppSelector(state => state.quiz.stat);
    const dispatch = useAppDispatch();
    const { mistakesCount, points, stage } = quizStat;

    const handlePlayAgainClick = () => {
        dispatch(thunkStartQuiz());
    };

    return (
        <div>
            <p className='text-center text-xl m-2'>Конец игры!</p>
            <div>
                <p className='font-medium text-green-700 text-lg'>Заработано баллов: {points}</p>
                <div className='text-center'>
                    <PlayButton onClick={handlePlayAgainClick}>Сыграть ещё</PlayButton>
                </div>
            </div>
        </div>
    );
};
