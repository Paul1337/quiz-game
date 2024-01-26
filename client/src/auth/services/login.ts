import { createAppAsyncThunk } from '../../app/store/store.model';
import { axiosInstance } from '../../shared/api/apiInstance';
import { authLocalStore } from '../local-store/authLocalStore';
import { userActions } from '../slices/userSlice';
import { UserDataScheme } from '../slices/userSlice.model';

interface LoginRequestScheme {
    username: string;
    password: string;
}

interface LoginResponse {
    authToken: string;
    userData: UserDataScheme;
}

export const thunkLogin = createAppAsyncThunk('user/login', async (loginData: LoginRequestScheme, thunkApi) => {
    try {
        const res = await axiosInstance.post<LoginResponse>('/auth/login', loginData);

        thunkApi.dispatch(userActions.setAuthed(true));
        const { authToken, userData } = res.data;

        thunkApi.dispatch(userActions.setUserData(userData));
        authLocalStore.setAuthToken(authToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

        return res.data;
    } catch (err) {
        console.log(err);
        return thunkApi.rejectWithValue([]);
    }
});
