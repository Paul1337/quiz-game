import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Question } from 'src/questions/schemas/question.schema';
import { QuizType } from '../enums/quiz-type.enum';
import { QuizDifficulty } from '../enums/quiz-difficulty.enum';
import { User } from 'src/users/schemas/user.schema';
import { EndQuizReason } from '../enums/quiz-end-reason.enum';

@Schema({
    collection: 'quizs',
    timestamps: true,
})
export class Quiz {
    @Prop({
        required: true,
    })
    stage: number;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'Question',
    })
    currentQuestion: Question | Types.ObjectId;

    @Prop({
        required: true,
    })
    points: number;

    @Prop({
        required: true,
    })
    type: QuizType;

    @Prop({
        required: true,
    })
    difficulty: QuizDifficulty;

    @Prop({ required: true })
    questionDifficulty: number;

    @Prop({ required: true })
    roundDifficulty: number;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: User | Types.ObjectId;

    @Prop({ required: true })
    length: number;

    @Prop({ required: true })
    isFinished: boolean;

    @Prop()
    endReason?: EndQuizReason;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    questionRequestedAt: Date;

    @Prop({ required: true })
    questionWasAnswered: boolean;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
export type QuizDocument = HydratedDocument<Quiz>;
