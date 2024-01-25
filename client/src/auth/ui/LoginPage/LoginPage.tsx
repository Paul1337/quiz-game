import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/store.model';
import { AuthRoutes } from '../../routes/authRoutes';
import { AuthPageWrapper } from '../AuthPageWrapper/AuthPageWrapper';
import { FormInputs } from './formInputs';
import { thunkLogin } from '../../services/login';
import { MenuRotes } from '../../../menu/routes/menuRoutes';
import { DataScheme, Form } from '../../../shared/ui/FormComponents/Form/Form';

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState('');
    const nagivate = useNavigate();

    const handleSubmit = (data: DataScheme) => {
        dispatch(
            thunkLogin({
                username: data.username,
                password: data.password,
            })
        )
            .unwrap()
            .then(() => {
                nagivate(MenuRotes.Menu);
            })
            .catch(errors => {
                setError('Проверьте данные');
                console.log(errors);
            });
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
                        to={AuthRoutes.Reg}
                    >
                        Создать аккаунт
                    </Link>
                </p>
            </Form>
        </AuthPageWrapper>
    );
};
