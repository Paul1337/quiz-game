import { EndQuizReason } from '../enums/quiz-end-reason.enum';

export interface AnswerQuizQuestionResponse {
    isRight: boolean;
    isFinished: boolean;
    scoreAward: number;
    endReason: EndQuizReason | null;
}
