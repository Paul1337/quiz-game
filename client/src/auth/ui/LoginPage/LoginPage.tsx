import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/store.model';
import { AuthPageWrapper } from '../AuthPageWrapper/AuthPageWrapper';
import { authFullRoutes } from '../../config/routes.config';
import { DataScheme, Form, InputData } from '../../../shared/ui/Form/Form';

const FormInputs: InputData[] = [
    {
        label: 'имя пользователя',
        key: 'username',
    },
    {
        label: 'пароль',
        key: 'password',
    },
];

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState('');
    const nagivate = useNavigate();

    const handleSubmit = (data: DataScheme) => {
        console.log('data', data);
        // const data = { username, password };
        // console.log('login, data', data);
        // dispatch(thunkLogIn(data))
        //     .then(() => {
        //         nagivate('/chat');
        //     })
        //     .catch(e => {
        //         console.log(e.response.data.message);
        //         setError(e.response.data.message);
        //     });
    };

    return (
        <AuthPageWrapper>
            <Form
                action='Войти'
                error={error}
                title='Вход в аккаунт'
                onSubmit={handleSubmit}
                inputs={FormInputs}
            >
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Нет аккаунта?
                    <Link
                        className='font-medium ml-2 text-primary-600 hover:underline dark:text-primary-500'
                        to={authFullRoutes.RegPage}
                    >
                        Создать аккаунт
                    </Link>
                </p>
            </Form>
        </AuthPageWrapper>
    );
};
