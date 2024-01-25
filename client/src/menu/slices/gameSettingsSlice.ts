import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSettingsSliceScheme } from './gameSettingsSlice.model';
import { DefaultGameSettings } from '../../app/config/gameSettings/gameSettings';
import { GameDifficulty, GameMode } from '../../app/config/gameSettings/gameSettings.model';

const initialState: GameSettingsSliceScheme = {
    difficulty: DefaultGameSettings.difficulty,
    mode: DefaultGameSettings.mode,
};

export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        setDifficulty(state: GameSettingsSliceScheme, action: PayloadAction<GameDifficulty>) {
            state.difficulty = action.payload;
        },
        setMode(state: GameSettingsSliceScheme, action: PayloadAction<GameMode>) {
            state.mode = action.payload;
        },
    },
});

export const { reducer: gameSettingsReducer } = gameSettingsSlice;
export const { actions: gameSettingsActions } = gameSettingsSlice;
