import React, { FC, FormEvent, ReactNode, useState } from 'react';
import { FormLayout } from './FormLayout';
import { Button } from '../Button/Button';
import { FormInput } from '../FormInput/FormInput';

export type DataScheme = Record<string, string>;

export interface InputData {
    label: string;
    key: string;
}

interface FormProps {
    title: string;
    inputs: InputData[];
    action: string;
    onSubmit: (data: DataScheme) => void;
    error: string;
    children?: ReactNode;
}

export const Form: FC<FormProps> = props => {
    const { onSubmit, error, inputs, action, title, children } = props;
    const [data, setData] = useState<DataScheme>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <FormLayout>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                {title}
            </h1>
            <form className='space-y-4 md:space-y-6' action='#' onSubmit={handleSubmit}>
                {inputs.map((input, ind) => (
                    <FormInput
                        key={input.label + ind}
                        label={input.label}
                        value={data[input.key] ?? ''}
                        onChange={newValue => {
                            setData(data => ({ ...data, [input.key]: newValue }));
                        }}
                    />
                ))}

                <Button
                    text={action}
                    type='submit'
                    className=' w-full mx-0 text-black bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                />
                <p className='text-red-500 font-md m-2 text-center'>{error ? 'Ошибка: ' + error : ''}</p>

                {children}
            </form>
        </FormLayout>
    );
};
