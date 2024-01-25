import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '../../../app/store/store.model';
import { Spinner } from '../../../shared/ui/UtilityComponents/Spinner/Spinner';
import { FinishedContent } from '../FinishedContent/FinishedContent';
import { Question } from '../Question/Question';
import { GameStage } from '../../slices/quizSlice.model';
import { PregameTimer } from '../PregameTimer/PregameTimer';
import { QuizErrorView } from '../QuizErrorView/QuizErrorView';

const ContentLayout: FC<PropsWithChildren> = ({ children }) => (
    <div className='flex justify-center min-h-32 bg-second-bg m-2 rounded-md'>{children}</div>
);

const Content = () => {
    const gameStage = useAppSelector(state => state.quiz.gameStage);

    switch (gameStage) {
        case GameStage.Loading:
            return (
                <div className='flex justify-center items-center'>
                    <Spinner />
                </div>
            );

        case GameStage.PregameTimer:
            return <PregameTimer />;

        case GameStage.Playing:
        case GameStage.AnswerGiven:
            return <Question className='w-full' />;

        case GameStage.Finished:
            return <FinishedContent />;

        case GameStage.Error:
            return <QuizErrorView />;
    }
};

export const QuizContent = () => {
    return (
        <ContentLayout>
            <Content />
        </ContentLayout>
    );
};
