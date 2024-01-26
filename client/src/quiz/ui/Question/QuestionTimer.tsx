import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store.model';
import { EndQuizReason, GameStage } from '../../slices/quizSlice.model';
import { thunkEndQuiz } from '../../services/endQuiz';
import { TimerId } from '../../../shared/lib/models/timerId';

export interface QuestionTimerProps {}

export const QuestionTimer: FC<QuestionTimerProps> = () => {
    const questionTime = useAppSelector(state => state.quiz.quizConfig!.questionTime);
    const quizQuestionStage = useAppSelector(state => state.quiz.stat.stage);
    const quizGameStage = useAppSelector(state => state.quiz.gameStage);
    const quizId = useAppSelector(state => state.quiz.quizId);
    const dispatch = useAppDispatch();

    const [time, setTime] = useState(questionTime);
    const interval = useRef<TimerId | null>(null);

    useEffect(() => {
        setTime(questionTime);
        if (interval.current) clearInterval(interval.current);
        interval.current = setInterval(() => setTime(time => --time), 1000);
        return () => {
            if (interval.current) clearInterval(interval.current);
        };
    }, [quizQuestionStage]);

    useEffect(() => {
        if (time === 0) {
            dispatch(thunkEndQuiz({ quizId, reason: EndQuizReason.Timedout }));
        }
    }, [time]);

    useEffect(() => {
        if (quizGameStage === GameStage.AnswerGiven) {
            interval.current && clearInterval(interval.current);
        }
    }, [quizGameStage]);

    return (
        <div className='flex justify-center p-2'>
            <div className='border rounded p-2 flex flex-col justify-between items-center gap-2 min-w-80'>
                <span>Осталось времени:</span>
                <p className='text-lg font-medium'>{time}</p>
            </div>
        </div>
    );
};
