import { axiosInstance } from '../../shared/api/apiInstance';
import { createAppAsyncThunk } from '../../app/store/store.model';

export const thunkCheckAuth = createAppAsyncThunk('user/me', async (_, thunkApi) => {
    try {
        const res = await axiosInstance.post('/auth/me');
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue('Не авторизован');
    }
});
