import React, { useEffect, useState } from 'react';
import { quizConfig } from '../../config/quizConfig';
import { useAppDispatch, useAppSelector } from '../../../app/store/store.model';
import { quizActions } from '../../slices/quizSlice';
import { GameStage } from '../../slices/quizSlice.model';
import { thunkGetNextQuestion } from '../../services/getNextQuestion';

export const PregameTimer = () => {
    const [time, setTime] = useState(quizConfig.timerStartQuiz);
    const quizId = useAppSelector(state => state.quiz.quizId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time => --time);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (time <= 0) {
            dispatch(quizActions.setStage(GameStage.Playing));
            dispatch(
                thunkGetNextQuestion({
                    quizId,
                })
            );
        }
    }, [time]);

    return (
        <div>
            <p className='font-medium text-lg text-center mt-4'>Приготовьтесь к началу игры...</p>
            <div className='m-2 text-center text-xl'>
                <p>{time}</p>
            </div>
        </div>
    );
};
