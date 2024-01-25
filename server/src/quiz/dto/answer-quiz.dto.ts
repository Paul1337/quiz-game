import { IsNotEmpty } from 'class-validator';

export class AnswerQuizDto {
    @IsNotEmpty()
    quizId: string;

    @IsNotEmpty()
    answer: string;
}
