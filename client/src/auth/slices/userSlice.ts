import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserDataScheme, UserProfileData, UserSliceScheme } from './userSlice.model';

const initialState: UserSliceScheme = {
    isAuthed: false,
    userData: null,
    profileData: null,
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
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
