import { useNavigate } from 'react-router-dom';
import { QuizRoutes } from '../../../quiz/routes/quizRoutes';
import { Button } from '../../../shared/ui/Buttons/Button/Button';
import { GameDescription } from '../GameDescription/GameDescription';
import { GameSelector } from '../GameSelector/GameSelector';
import { PlayButton } from '../../../shared/ui/Buttons/Button/PlayButton';

export const MenuContent = () => {
    const nagivate = useNavigate();

    const handleStartClick = () => {
        nagivate(QuizRoutes.Quiz);
    };

    return (
        <div className='flex flex-col sm:flex-row sm:h-96 min-h-0 flex-1 '>
            <div className='flex flex-col justify-between gap-2 border border-main-transparent m-2 rounded-md sm:w-72 bg-second-bg'>
                <GameSelector className='' />
                <PlayButton className='hover:bg-green-100' onClick={handleStartClick}>
                    Начать игру
                </PlayButton>
            </div>
            <GameDescription />
        </div>
    );
};
