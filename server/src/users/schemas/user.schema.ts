import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from 'src/auth/role.enum';

export interface UserStatScheme {
    gamesPlayed: number;
    correctAnswers: number;
    answersPlayed: number;
}

@Schema({
    collection: 'users',
    timestamps: true,
})
export class User {
    _id: Types.ObjectId;

    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        required: true,
    })
    roles: Role[];

    @Prop({ required: true })
    points: number;

    @Prop()
    firstName?: string;

    @Prop()
    lastName?: string;

    @Prop(
        raw({
            gamesPlayed: Number,
            correctAnswers: Number,
            answersPlayed: Number,
        }),
    )
    stat: UserStatScheme;

    @Prop()
    profileImg?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
