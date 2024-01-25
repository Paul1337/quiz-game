import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnswerStatus, EndQuizReason, GameStage, QuizError, QuizSliceScheme } from './quizSlice.model';
import { thunkStartQuiz } from '../services/startQuiz';
import { thunkAnswerQuestion } from '../services/answerQuestion';
import { thunkEndQuiz } from '../services/endQuiz';
import { thunkGetNextQuestion } from '../services/getNextQuestion';

const initialState: QuizSliceScheme = {
    currentQuestion: null,
    stat: {
        points: 0,
        stage: 1,
        mistakesCount: 0,
    },

    gameStage: GameStage.Loading,
    quizError: null,
    isFinished: false,

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
        setStage: (state, action: PayloadAction<GameStage>) => {
            state.gameStage = action.payload;
        },
        endQuiz(state, action: PayloadAction<EndQuizReason>) {
            state.isFinished = true;
            state.currentQuestion = null;
            state.gameStage = GameStage.Finished;
            state.endReason = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(thunkStartQuiz.rejected, (state, action) => {
            state.stat.mistakesCount = 0;
            state.stat.stage = 1;
            state.stat.points = 0;

            state.quizError = action.payload ?? QuizError.Unknown;
            state.gameStage = GameStage.Error;
        });

        builder.addCase(thunkStartQuiz.fulfilled, (state, action) => {
            state.stat.mistakesCount = 0;
            state.stat.stage = 0;
            state.stat.points = 0;
            state.quizId = action.payload.quizId;
            state.quizConfig = action.payload.quizConfig;
            state.answerStatus = AnswerStatus.NotGiven;
            state.quizError = null;
            state.gameStage = GameStage.PregameTimer;
            state.isFinished = false;
        });

        builder.addCase(thunkAnswerQuestion.fulfilled, (state, action) => {
            state.isFinished = action.payload.isFinished;
            if (action.payload.isRight) {
                state.answerStatus = AnswerStatus.IsRight;
            } else {
                state.stat.mistakesCount++;
                state.answerStatus = AnswerStatus.IsWrong;
            }
            state.gameStage = GameStage.AnswerGiven;
            state.stat.points += action.payload.scoreAward;
            state.endReason = action.payload.endReason;
        });

        builder.addCase(thunkGetNextQuestion.pending, (state, action) => {
            // state.currentQuestion = null;
        });
        builder.addCase(thunkGetNextQuestion.rejected, (state, action) => {
            state.quizError = action.payload ?? QuizError.Unknown;
            state.gameStage = GameStage.Error;
        });
        builder.addCase(thunkGetNextQuestion.fulfilled, (state, action) => {
            state.stat.stage++;
            state.currentQuestion = action.payload.question;
            state.answerStatus = AnswerStatus.NotGiven;
        });

        builder.addCase(thunkEndQuiz.fulfilled, (state, action) => {});
    },
});

export const { reducer: quizReducer } = quizSlice;
export const { actions: quizActions } = quizSlice;
