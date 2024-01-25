import { createAppAsyncThunk } from '../../app/store/store.model';
import { axiosInstance } from '../../shared/api/apiInstance';

export interface CreateQuestionRequest {
    text: string;
    options: string[];
    rightAnswer: string;
    difficulty: number;
}

export const thunkCreateQuestion = createAppAsyncThunk<
    any,
    CreateQuestionRequest,
    { rejectValue: string }
>('admin/createQuestion', async (data, thunkApi) => {
    try {
        await axiosInstance.post('questions/create', data);
    } catch (err) {
        console.log(err);
        return thunkApi.rejectWithValue('Что-то пошло не так');
    }
});
