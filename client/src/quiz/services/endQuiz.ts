import { createAppAsyncThunk } from '../../app/store/store.model';
import { axiosInstance } from '../../shared/api/apiInstance';
import { quizActions } from '../slices/quizSlice';
import { EndQuizReason } from '../slices/quizSlice.model';

export interface EndQuizRequest {
    quizId: string;
    reason: EndQuizReason;
}

export interface EndQuizReponse {}

export const thunkEndQuiz = createAppAsyncThunk<EndQuizReponse, EndQuizRequest>(
    'quiz/end',
    async (data, thunkApi) => {
        try {
            const res = await axiosInstance.post<EndQuizReponse>('/quiz/end', data);
            thunkApi.dispatch(quizActions.endQuiz(data.reason));
            return res.data;
        } catch (err) {
            return thunkApi.rejectWithValue('Что-то пошло не так');
        }
    }
);
