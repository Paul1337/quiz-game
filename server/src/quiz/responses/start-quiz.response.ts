import { QuizConfig } from '../config/quiz.config';

export interface StartQuizResponse {
    quizId: string;
    quizConfig: QuizConfig;
}
