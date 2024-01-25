import { IsNotEmpty } from 'class-validator';

export class AnswerQuestionDto {
    @IsNotEmpty()
    questionId: string;

    @IsNotEmpty()
    answer: string;
}
