import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { thunkCreateQuestion } from '../services/createQuestion';
import { AdminSliceScheme } from './adminSlice.model';

const initialState: AdminSliceScheme = {
    createQuestionState: {
        error: '',
        isLoading: false,
    },
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(thunkCreateQuestion.pending, (state, action) => {
            state.createQuestionState.isLoading = true;
            state.createQuestionState.error = '';
        });
        builder.addCase(thunkCreateQuestion.rejected, (state, action) => {
            if (action.payload) {
                state.createQuestionState.error = action.payload;
            }
        });
        builder.addCase(thunkCreateQuestion.fulfilled, (state, action: PayloadAction) => {
            state.createQuestionState.isLoading = false;
        });
    },
});

export const { actions: adminActions } = adminSlice;
export const { reducer: adminReducer } = adminSlice;
