import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({
    collection: 'user-questions',
})
export class UserQuestions {
    _id: Types.ObjectId;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId | User;

    @Prop({
        required: true,
        type: [{ type: Types.ObjectId, ref: 'Question' }],
    })
    questionsIds: Types.ObjectId[];
}

export const UserQuestionsSchema = SchemaFactory.createForClass(UserQuestions);
export type UserQuestionsDocument = HydratedDocument<UserQuestions>;
