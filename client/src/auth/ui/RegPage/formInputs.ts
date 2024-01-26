import { InputData } from '../../../shared/ui/FormComponents/Form/Form';

export const FormInputs: InputData[] = [
    {
        label: 'username',
        key: 'username',
        inputProps: {
            // minLength: 4,
        },
    },
    {
        label: 'имя',
        key: 'firstName',
        inputProps: {
            // minLength: 3,
        },
    },
    {
        label: 'фамилия',
        key: 'lastName',
        inputProps: {
            // minLength: 3,
        },
    },
    {
        label: 'email',
        key: 'email',
        inputProps: {
            // isEmail: true,
        },
    },
    {
        label: 'пароль',
        key: 'password',
        type: 'password',
        inputProps: {
            // minLength: 5,
        },
    },
    {
        label: 'повторите пароль',
        key: 'confirmPassword',
        type: 'password',
    },
];
