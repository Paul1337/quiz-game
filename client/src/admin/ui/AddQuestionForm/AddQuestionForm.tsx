import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/store.model';
import { DataScheme, Form } from '../../../shared/ui/FormComponents/Form/Form';
import { thunkCreateQuestion } from '../../services/createQuestion';
import { FormInputs } from './formInputs';
import { useModal } from '../../../shared/ui/Modal/useModal';
import { SuccessModal } from '../../../shared/ui/Modal/SuccessModal';

export const AddQuestionForm = () => {
    const state = useAppSelector(state => state.admin.createQuestionState);
    const dispatch = useAppDispatch();
    const successModal = useModal();

    const handleSubmit = (data: DataScheme) => {
        console.log('should create new question', data);
        if (state.isLoading) return;
        dispatch(
            thunkCreateQuestion({
                difficulty: Number(data.difficulty),
                options: [data.opt1, data.opt2, data.opt3],
                rightAnswer: data.rightAnswer,
                text: data.text,
            })
        )
            .unwrap()
            .then(() => {
                console.log('ok');
                successModal.show();
            });
    };

    return (
        <>
            <Form
                layoutClassName='border-none p-0'
                action='Создать вопрос'
                error={state.error}
                title='Создание вопроса'
                onSubmit={handleSubmit}
                inputs={FormInputs}
                className='p-0'
            ></Form>
            {successModal.isShowing && <SuccessModal onClose={successModal.hide} />}
        </>
    );
};
