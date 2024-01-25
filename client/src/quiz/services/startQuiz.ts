import { GameDifficulty, GameMode } from '../../app/config/gameSettings/gameSettings.model';
import { createAppAsyncThunk } from '../../app/store/store.model';
import { axiosInstance } from '../../shared/api/apiInstance';
import { QuestionScheme, QuizConfig } from '../slices/quizSlice.model';

export interface StartQuizResponse {
    quizId: string;
    quizConfig: QuizConfig;
    firstQuestion: QuestionScheme;
}

const DifficultyMapper: Record<GameDifficulty, string> = {
    [GameDifficulty.Easy]: 'easy',
    [GameDifficulty.Medium]: 'medium',
    [GameDifficulty.Hard]: 'hard',
};

const ModeMapper: Record<GameMode, string> = {
    [GameMode.Classic]: 'classic',
    [GameMode.Blitz]: 'blitz',
    [GameMode.NoMistake]: 'firstMistake',
};

export const thunkStartQuiz = createAppAsyncThunk<StartQuizResponse>(
    'quiz/start',
    async (_, thunkApi) => {
        try {
            const gameSettings = thunkApi.getState().gameSettings;
            const data = {
                difficulty: DifficultyMapper[gameSettings.difficulty],
                type: ModeMapper[gameSettings.mode],
            };
            const res = await axiosInstance.post<StartQuizResponse>('/quiz/start', data);
            return res.data;
        } catch (err) {
            return thunkApi.rejectWithValue('Что-то пошло не так');
        }
    }
);
