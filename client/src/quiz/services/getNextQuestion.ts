import { createAppAsyncThunk } from '../../app/store/store.model';
import { axiosInstance } from '../../shared/api/apiInstance';
import { QuestionScheme, QuizError } from '../slices/quizSlice.model';

export interface GetNextQuestionRequest {
    quizId: string;
}

export interface GetNextQuestionReponse {
    question: QuestionScheme | null;
}

export const thunkGetNextQuestion = createAppAsyncThunk<
    GetNextQuestionReponse,
    GetNextQuestionRequest,
    { rejectValue: QuizError }
>('quiz/getNextQuestion', async (data, thunkApi) => {
    try {
        const res = await axiosInstance.get<GetNextQuestionReponse>('/quiz/nextQuestion', {
            params: data,
        });
        return res.data;
    } catch (err: any) {
        const message = err?.response?.data?.message as QuizError;
        if (message) {
            return thunkApi.rejectWithValue(message);
        }
        return thunkApi.rejectWithValue(QuizError.Unknown);
    }
});
