import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { thunkLogin } from '../services/login';
import { thunkRegister } from '../services/register';
import { UserDataScheme, UserProfileData, UserSliceScheme } from './userSlice.model';

const initialState: UserSliceScheme = {
    isAuthed: false,
    userData: null,
    profileData: null,
    // {
    //     points: 0,
    //     firstName: 'Павел',
    //     lastName: 'Дьяченко',
    //     stat: {
    //         answersPlayed: 0,
    //         correctAnswers: 0,
    //         gamesPlayed: 0,
    //     },
    // },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state: UserSliceScheme, action: PayloadAction<UserDataScheme | null>) {
            state.userData = action.payload;
        },
        setAuthed(state: UserSliceScheme, action: PayloadAction<boolean>) {
            state.isAuthed = action.payload;
        },
        setProfileData(state: UserSliceScheme, action: PayloadAction<UserProfileData>) {
            state.profileData = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(thunkLogin.fulfilled, (state, action) => {});
        builder.addCase(thunkLogin.rejected, (state, action) => {});
        builder.addCase(thunkRegister.fulfilled, (state, action) => {});
    },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
