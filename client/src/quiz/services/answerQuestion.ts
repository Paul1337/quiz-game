import { createAppAsyncThunk } from '../../app/store/store.model';
import { axiosInstance } from '../../shared/api/apiInstance';

export interface AnswerQuestionRequest {
    quizId: string;
    answer: string;
}

export interface AnswerQuestionReponse {
    isRight: boolean;
    isFinished: boolean;
    scoreAward: number;
}

export const thunkAnswerQuestion = createAppAsyncThunk<AnswerQuestionReponse, AnswerQuestionRequest>(
    'quiz/answerQuestion',
    async (data, thunkApi) => {
        try {
            const res = await axiosInstance.post<AnswerQuestionReponse>('/quiz/answerQuestion', data);
            return res.data;
        } catch (err) {
            return thunkApi.rejectWithValue('Что-то пошло не так');
        }
    }
);
