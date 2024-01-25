import { QuizDifficulty } from '../enums/quiz-difficulty.enum';
import { QuizType } from '../enums/quiz-type.enum';

export type DifficultyRange = [number, number];
export const QuestionsDifficulties: Record<QuizDifficulty, DifficultyRange> = {
    [QuizDifficulty.Easy]: [1, 3],
    [QuizDifficulty.Medium]: [4, 6],
    [QuizDifficulty.Hard]: [7, 10],
};

export interface QuizConfig {
    questionTime: number;
    roundDifficulty: number;
    length: number;
    roundSpecific?: any;
}

// basically:
// answerPoints = floor(question.difficulty * round.difficulty * kGlobal) (+ probably bonus for super fast answer)
// but in firstMistake - every right answer improves by 0.15 roundDifficulty

export const QuizConfigs: Record<QuizType, QuizConfig> = {
    [QuizType.Classic]: {
        length: 10,
        questionTime: 90,
        roundDifficulty: 1,
    },
    [QuizType.Blitz]: {
        length: 10,
        questionTime: 35,
        roundDifficulty: 3,
    },
    [QuizType.FirstMistake]: {
        length: 20,
        questionTime: 150,
        roundDifficulty: 0.6,
        roundSpecific: {
            roundDifficultyImproves: 0.15,
        },
    },
};

export const SERVER_LATENCY_ERROR_MS = 5000;
export const GLOBAL_DIFFICULTY_K = 1;
