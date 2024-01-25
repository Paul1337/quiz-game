import { createSlice } from '@reduxjs/toolkit';
import { AnswerStatus, QuizSliceScheme } from './quizSlice.model';
import { thunkStartQuiz } from '../services/startQuiz';
import { thunkAnswerQuestion } from '../services/answerQuestion';
import { thunkEndQuiz } from '../services/endQuiz';

const initialState: QuizSliceScheme = {
    currentQuestion: {
        id: '123',
        options: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4'],
        text: 'Какой-то тестовый вопрос для теста. Тест?',
    },
    stat: {
        points: 0,
        stage: 1,
        mistakesCount: 0,
    },
    isLoadingQuestion: true,
    isFinished: false,
    isStarted: false,

    quizId: '',
    quizConfig: null,
    answerStatus: AnswerStatus.NotGiven,
    endReason: null,
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        resetAnswerStatus: state => {
            state.answerStatus = AnswerStatus.NotGiven;
        },
        // endQuiz: state => {
        //     state.currentQuestion = null;
        //     state.isFinished = true;
        //     state.isStarted = false;
        // },
    },
    extraReducers: builder => {
        builder.addCase(thunkStartQuiz.fulfilled, (state, action) => {
            state.stat.mistakesCount = 0;
            state.stat.stage = 1;
            state.stat.points = 0;
            state.currentQuestion = action.payload.firstQuestion;
            state.quizId = action.payload.quizId;
            state.quizConfig = action.payload.quizConfig;
            state.isLoadingQuestion = false;
            state.isStarted = true;
        });

        builder.addCase(thunkAnswerQuestion.fulfilled, (state, action) => {
            // state.currentQuestion = action.payload.nextQuestion;

            state.isFinished = action.payload.isFinished;
            if (action.payload.isFinished) {
                state.isStarted = false;
            }
            if (action.payload.isRight) {
                state.answerStatus = AnswerStatus.IsRight;
            } else {
                state.stat.mistakesCount++;
                state.answerStatus = AnswerStatus.IsWrong;
            }
            state.stat.stage++;
            state.stat.points += action.payload.scoreAward;
        });

        builder.addCase(thunkEndQuiz.fulfilled, (state, action) => {
            state.currentQuestion = null;
            state.isFinished = true;
            state.isStarted = false;
        });
    },
});

export const { reducer: quizReducer } = quizSlice;
export const { actions: quizActions } = quizSlice;
