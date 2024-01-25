export enum GameDifficulty {
    Easy = 'Легко',
    Medium = 'Средне',
    Hard = 'Сложно',
}

export enum GameMode {
    Classic = 'Классика',
    Blitz = 'Блиц',
    NoMistake = 'До первой ошибки',
}

export interface GameSettingsScheme {
    difficulty: GameDifficulty;
    mode: GameMode;
}
