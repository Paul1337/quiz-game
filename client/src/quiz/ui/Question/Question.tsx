import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store.model';
import { Button } from '../../../shared/ui/Buttons/Button/Button';
import { thunkAnswerQuestion } from '../../services/answerQuestion';
import { thunkEndQuiz } from '../../services/endQuiz';
import { QuestionTimer } from './QuestionTimer';
import { EndQuizReason } from '../../slices/quizSlice.model';

interface QuestionProps {
    className?: string;
}

export const Question: FC<QuestionProps> = props => {
    const { className } = props;
    const question = useAppSelector(state => state.quiz.currentQuestion);
    const quizId = useAppSelector(state => state.quiz.quizId);
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string | null>(null);
    if (!question) return <>А вопроса нет</>;
    const { text, options } = question;

    const handleOptionClick = (option: string) => {
        setSelected(option);
    };

    const handleAnswerClick = () => {
        if (!selected) return;

        dispatch(
            thunkAnswerQuestion({
                quizId,
                answer: selected,
            })
        );
    };

    const handleTimedout = () => {
        dispatch(
            thunkEndQuiz({
                quizId,
                reason: EndQuizReason.Timedout,
            })
        );
    };

    useEffect(() => {
        setSelected(null);
    }, [question]);

    return (
        <div className={className}>
            <p className='p-2 m-2 text-center font-normal text-xl'>{text}</p>
            <QuestionTimer timeoutCallback={handleTimedout} />
            <div className='grid grid-cols-2 m-2'>
                {options.map((opt, index) => (
                    <Button
                        className={classNames('min-w-4 font-normal', {
                            'border-orange-500 shadow-md shadow-orange-500': opt === selected,
                        })}
                        onClick={() => handleOptionClick(opt)}
                        key={opt + index}
                    >
                        {opt}
                    </Button>
                ))}
            </div>
            <div className='text-center'>
                <Button
                    disabled={!selected}
                    className='w-72 text-xl font-medium text-green-700'
                    onClick={handleAnswerClick}
                >
                    Ответить
                </Button>
            </div>
        </div>
    );
};
