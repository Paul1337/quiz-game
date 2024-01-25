import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../auth/slices/userSlice';
import { gameSettingsReducer } from '../../menu/slices/gameSettingsSlice';
import { quizReducer } from '../../quiz/slices/quizSlice';
import { adminReducer } from '../../admin/slices/adminSlice';

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        gameSettings: gameSettingsReducer,
        quiz: quizReducer,
        admin: adminReducer,
    }),
    devTools: true,
});
