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
        <div className=''>
            <div className='flex flex-row h-96'>
                <div className='flex flex-col justify-between gap-2 border border-main-transparent m-2 rounded-md w-72 bg-second-bg'>
                    <GameSelector />
                    <PlayButton onClick={handleStartClick}>Начать игру</PlayButton>
                </div>
                <GameDescription />
            </div>
        </div>
    );
};
