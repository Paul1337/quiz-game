import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({
    collection: 'questions',
    timestamps: true,
})
export class Question {
    _id: Types.ObjectId;

    @Prop({
        required: true,
    })
    text: string;

    @Prop({
        required: true,
    })
    options: string[];

    @Prop({
        required: true,
    })
    rightAnswer: string;

    @Prop({
        required: true,
    })
    difficulty: number;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    author: User | Types.ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export type QuestionDocument = HydratedDocument<Question>;
