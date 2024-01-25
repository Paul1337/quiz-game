import { ArrayMinSize, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    text: string;

    @ArrayMinSize(3)
    options: string[];

    @IsNotEmpty()
    rightAnswer: string;

    @IsDefined()
    difficulty: number;
}
