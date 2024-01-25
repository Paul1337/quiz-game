import { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../app/store/store.model';

export interface QuestionTimerProps {
    timeoutCallback?: () => void;
}

export const QuestionTimer: FC<QuestionTimerProps> = ({ timeoutCallback }) => {
    const questionTime = useAppSelector(state => state.quiz.quizConfig!.questionTime);
    const quizStage = useAppSelector(state => state.quiz.stat.stage);

    const [time, setTime] = useState(questionTime);
    const interval = useRef<number | null>(null);

    useEffect(() => {
        setTime(questionTime);
        if (interval.current) clearInterval(interval.current);
        interval.current = setInterval(() => {
            setTime(time => {
                if (--time === 0) {
                    timeoutCallback?.();
                }
                return time;
            });
        }, 1000);

        return () => {
            if (interval.current) clearInterval(interval.current);
        };
    }, [quizStage]);

    return (
        <div className='flex justify-center p-2'>
            <div className='border rounded p-2 flex flex-col justify-between items-center gap-2 min-w-80'>
                <span>Осталось времени:</span>
                <p className='text-lg font-medium'>{time}</p>
            </div>
        </div>
    );
};
