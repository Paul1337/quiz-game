import { IsDefined, IsInt, IsNumber, isDefined } from 'class-validator';

export class GetQuestionDto {
    @IsDefined()
    minDifficulty: number;

    @IsDefined()
    maxDifficulty: number;
}
