import { IsNotEmpty } from 'class-validator';

export class GetNextQuestionDto {
    @IsNotEmpty()
    quizId: string;
}
