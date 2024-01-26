import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthRoutes } from '../../routes/authRoutes';
import { AuthPageWrapper } from '../AuthPageWrapper/AuthPageWrapper';
import { FormInputs } from './formInputs';
import { useAppDispatch } from '../../../app/store/store.model';
import { thunkRegister } from '../../services/register';
import { DataScheme, Form } from '../../../shared/ui/FormComponents/Form/Form';

export const RegPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (data: DataScheme) => {
        // console.log('data', data);
        if (data.password !== data.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }
        dispatch(
            thunkRegister({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                username: data.username,
            })
        )
            .unwrap()
            .then(res => {
                navigate(AuthRoutes.Login);
            })
            .catch((errors: string[]) => {
                setError('Проверьте данные');
                console.log(errors);
            });
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
                        to={AuthRoutes.Login}
                    >
                        Войти
                    </Link>
                </p>
            </Form>
        </AuthPageWrapper>
    );
};
