import { IsNotEmpty } from 'class-validator';
import { QuizDifficulty } from '../enums/quiz-difficulty.enum';
import { QuizType } from '../enums/quiz-type.enum';

export class StartQuizDto {
    @IsNotEmpty()
    difficulty: QuizDifficulty;

    @IsNotEmpty()
    type: QuizType;
}
