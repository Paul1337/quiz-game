import { IsNotEmpty } from 'class-validator';
import { EndQuizReason } from '../enums/quiz-end-reason.enum';

export class EndQuizDto {
    @IsNotEmpty()
    quizId: string;

    @IsNotEmpty()
    reason: EndQuizReason;
}
