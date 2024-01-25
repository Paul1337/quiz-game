import { createAppAsyncThunk } from '../../app/store/store.model';
import { axiosInstance } from '../../shared/api/apiInstance';

interface RegisterRequestScheme {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const thunkRegister = createAppAsyncThunk(
    'user/reg',
    async (registerData: RegisterRequestScheme, thunkApi) => {
        try {
            const res = await axiosInstance.post('/auth/reg', registerData);
            return res.data;
        } catch (err: any) {
            return thunkApi.rejectWithValue(err?.response.data.message);
        }
    }
);
