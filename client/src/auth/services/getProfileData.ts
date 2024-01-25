import { axiosInstance } from '../../shared/api/apiInstance';
import { createAppAsyncThunk } from '../../app/store/store.model';
import { UserStatScheme } from '../slices/userSlice.model';
import { userActions } from '../slices/userSlice';

interface GetProfileDataResponse {
    firstName: string;
    lastName: string;
    points: number;
    stat: UserStatScheme;
}

export const thunkGetProfileData = createAppAsyncThunk<GetProfileDataResponse>(
    'user/getProfile',
    async (_, thunkApi) => {
        try {
            const res = await axiosInstance.get('/users/profile');
            thunkApi.dispatch(userActions.setProfileData(res.data));
            return res.data;
        } catch (err) {
            return thunkApi.rejectWithValue('что-то не то');
        }
    }
);
