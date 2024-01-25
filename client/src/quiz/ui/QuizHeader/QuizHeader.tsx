import { useAppSelector } from '../../../app/store/store.model';
import { HomeButton } from '../../../shared/ui/Buttons/Navigation/HomeButton/HomeButton';
import { PageHeader } from '../../../shared/ui/PageComponents/PageHeader/PageHeader';
import { GameStage } from '../../slices/quizSlice.model';

export const QuizHeader = () => {
    const stat = useAppSelector(state => state.quiz.stat);
    const quizStage = useAppSelector(state => state.quiz.gameStage);
    const quizConfig = useAppSelector(state => state.quiz.quizConfig);
    const gameMode = useAppSelector(state => state.gameSettings.mode);
    const { mistakesCount, points, stage } = stat;

    return (
        <PageHeader>
            <div className='w-48'>
                <HomeButton />
            </div>
            <span className=' flex flex-col items-center'>
                <span className='font-medium text-xl'>{gameMode}</span>
                {quizStage !== GameStage.PregameTimer && quizStage !== GameStage.Loading && (
                    <span className='text-main'>
                        Текущий вопрос: {stage} / {quizConfig?.length}
                    </span>
                )}
            </span>
            <div className='text-main w-48'>
                <p>Баллы: {points}</p>
                <p>Ошибок допущено: {mistakesCount}</p>
            </div>
        </PageHeader>
    );
};
