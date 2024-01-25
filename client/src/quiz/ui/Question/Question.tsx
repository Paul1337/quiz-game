import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store.model';
import { Button } from '../../../shared/ui/Buttons/Button/Button';
import { Spinner } from '../../../shared/ui/UtilityComponents/Spinner/Spinner';
import { thunkAnswerQuestion } from '../../services/answerQuestion';
import { thunkEndQuiz } from '../../services/endQuiz';
import { AnswerStatus, EndQuizReason } from '../../slices/quizSlice.model';
import { OptionButton } from './OptionButton';
import { QuestionTimer } from './QuestionTimer';

interface QuestionProps {
    className?: string;
}

export const Question: FC<QuestionProps> = props => {
    const { className } = props;
    const question = useAppSelector(state => state.quiz.currentQuestion);
    const answerStatus = useAppSelector(state => state.quiz.answerStatus);
    const quizId = useAppSelector(state => state.quiz.quizId);
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        setSelected(null);
    }, [question]);

    if (!question) return <Spinner />;
    const { text, options } = question;

    const handleAnswerClick = () => {
        if (!selected) return;
        dispatch(thunkAnswerQuestion({ quizId, answer: selected }));
    };

    return (
        <div className={className}>
            <p className='p-2 m-2 text-center font-normal text-xl'>{text}</p>
            <QuestionTimer />
            <div className='grid grid-cols-2 m-2'>
                {options.map((opt, index) => (
                    <OptionButton
                        onClick={() => setSelected(opt)}
                        key={opt + index}
                        isSelected={opt === selected}
                        answerStatus={opt === selected ? answerStatus : AnswerStatus.NotGiven}
                    >
                        {opt}
                    </OptionButton>
                ))}
            </div>
            <div className='text-center'>
                <Button
                    disabled={!selected || answerStatus !== AnswerStatus.NotGiven}
                    className='w-72 text-xl font-medium text-green-700'
                    onClick={handleAnswerClick}
                >
                    Ответить
                </Button>
            </div>
        </div>
    );
};
