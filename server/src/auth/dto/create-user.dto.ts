import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'username не указан' })
    username: string;

    @IsEmail({}, { message: 'email некорректный' })
    email: string;

    @Length(5, undefined, { message: 'пароль должен быть от 5 символов длиной' })
    password: string;

    @IsNotEmpty({ message: 'имя не указано' })
    @Length(3, undefined, { message: 'Имя слишком короткое. Минимум 3 символа' })
    firstName: string;

    @IsNotEmpty({ message: 'фамилия не указана' })
    @Length(3, undefined, { message: 'Фамилия слишком короткая. Минимум 3 символа' })
    lastName: string;
}
