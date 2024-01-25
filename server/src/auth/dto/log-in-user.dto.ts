import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class LogInUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @Length(3)
    password: string;
}
