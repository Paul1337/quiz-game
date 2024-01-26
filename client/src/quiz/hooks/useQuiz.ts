import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store.model';
import { thunkStartQuiz } from '../services/startQuiz';
import { GameStage } from '../slices/quizSlice.model';
import { quizConfig } from '../config/quizConfig';
import { quizActions } from '../slices/quizSlice';
import { thunkGetNextQuestion } from '../services/getNextQuestion';
import { TimerId } from '../../shared/lib/models/timerId';

export const useQuiz = () => {
    const dispatch = useAppDispatch();
    const quizId = useAppSelector(state => state.quiz.quizId);
    const quizStage = useAppSelector(state => state.quiz.gameStage);
    const quizFinished = useAppSelector(state => state.quiz.isFinished);
    const timer = useRef<TimerId | null>(null);

    useEffect(() => {
        dispatch(thunkStartQuiz());
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    useEffect(() => {
        if (quizStage === GameStage.AnswerGiven) {
            if (quizFinished) {
                timer.current = setTimeout(() => {
                    dispatch(quizActions.setStage(GameStage.Finished));
                }, quizConfig.nextQuestionDelay);
            } else {
                timer.current = setTimeout(() => {
                    dispatch(thunkGetNextQuestion({ quizId }));
                    dispatch(quizActions.setStage(GameStage.Playing));
                }, quizConfig.nextQuestionDelay);
            }
        }
    }, [quizStage, quizFinished]);
};
