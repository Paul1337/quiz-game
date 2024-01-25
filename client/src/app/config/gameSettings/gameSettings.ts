import { GameDifficulty, GameMode, GameSettingsScheme } from './gameSettings.model';

export const DefaultGameSettings: GameSettingsScheme = {
    difficulty: GameDifficulty.Medium,
    mode: GameMode.Classic,
};

export const gameModes = Object.values(GameMode);
export const gameDifficulties = Object.values(GameDifficulty);
