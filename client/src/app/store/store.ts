import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../auth/slices/userSlice';

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
    }),
});
