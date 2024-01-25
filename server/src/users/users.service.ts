import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserStatScheme } from './schemas/user.schema';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Role } from 'src/auth/role.enum';

export interface GetUserProfileResponse {
    firstName: string;
    lastName: string;
    points: number;
    stat: UserStatScheme;
}

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll() {
        return this.userModel
            .find(
                {},
                {
                    username: true,
                    email: true,
                },
            )
            .exec();
    }

    async getUserProfile(userId: string): Promise<GetUserProfileResponse> {
        const user = await this.findOne({
            _id: new Types.ObjectId(userId),
        });

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            stat: user.stat,
            points: user.points,
        };
    }

    async findOne(findUserDto: Record<string, any>) {
        const user = await this.userModel.findOne<UserDocument>(findUserDto).exec();
        return user;
    }

    async createOne(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel({
            email: createUserDto.email,
            username: createUserDto.username,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            password: createUserDto.password,
            roles: [Role.Player],
        });
        await newUser.save();
        return newUser;
    }
}
