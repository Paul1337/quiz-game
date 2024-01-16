import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataScheme, Form, InputData } from '../../../shared/ui/Form/form';
import { AuthPageWrapper } from '../AuthPageWrapper/AuthPageWrapper';
import { authFullRoutes } from '../../config/routes.config';

const FormInputs: InputData[] = [
    {
        label: 'username',
        key: 'username',
    },
    {
        label: 'имя',
        key: 'firstName',
    },
    {
        label: 'фамилия',
        key: 'lastName',
    },
    {
        label: 'email',
        key: 'email',
    },
    {
        label: 'пароль',
        key: 'password',
    },

    {
        label: 'повторите пароль',
        key: 'confirmPassword',
    },
];

export const RegPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (data: DataScheme) => {
        console.log('data', data);
        if (data.password === data.confirmPassword) {
            // const data = { username, email, password };
            // console.log('form data', data);
            // dispatch(thunkRegister(data))
            //     .then(() => {
            //         navigate('/auth/login');
            //     })
            //     .catch(e => {
            //         console.log(e.response.data.message);
            //         setError(e.response?.data?.message?.join('; '));
            //     });
        } else {
            setError('Пароли не совпадают');
        }
    };

    return (
        <AuthPageWrapper>
            <Form
                action='Создать аккаунт'
                error={error}
                title='Регистрация'
                onSubmit={handleSubmit}
                inputs={FormInputs}
            >
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Уже зарегестрированы?
                    <Link
                        className='font-medium ml-2 text-primary-600 hover:underline dark:text-primary-500'
                        to={authFullRoutes.LoginPage}
                    >
                        Войти
                    </Link>
                </p>
            </Form>
        </AuthPageWrapper>
    );
};
