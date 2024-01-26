import { FC, FormEvent, ReactNode, useState } from 'react';

import { FormLayout } from './FormLayout';
import { twMerge } from 'tailwind-merge';
import { ValidatingFormInput, ValidatingFormInputProps } from '../FormInput/ValidatingFormInput';
import { Button } from '../../Buttons/Button/Button';
import { FormInputVariant } from '../FormInput/FormInput';

export type DataScheme = Record<string, string>;

export interface InputData {
    label: string;
    key: string;
    type?: string;
    inputProps?: Partial<ValidatingFormInputProps>;
    as?: FormInputVariant;
}

interface FormProps {
    title: string;
    inputs: InputData[];
    action: string;
    onSubmit: (data: DataScheme) => void;
    error: string;
    children?: ReactNode;
    layoutClassName?: string;
    className?: string;
    clearOnSubmit?: boolean;
}

export const Form: FC<FormProps> = props => {
    const {
        onSubmit,
        error,
        inputs,
        action,
        title,
        children,
        className,
        layoutClassName,
        clearOnSubmit,
    } = props;
    const [data, setData] = useState<DataScheme>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(data);
        if (clearOnSubmit) {
            setData({});
        }
    };

    return (
        <FormLayout className={twMerge('max-h-full overflow-y-auto', layoutClassName)}>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                {title}
            </h1>
            <form
                className={twMerge(' sm:space-y-2 md:space-y-4', className)}
                action='#'
                onSubmit={handleSubmit}
            >
                {inputs.map((input, ind) => (
                    <ValidatingFormInput
                        type={input.type}
                        key={input.label + ind}
                        label={input.label}
                        value={data[input.key] ?? ''}
                        as={input.as}
                        onChange={(newValue: string) => {
                            setData(data => ({ ...data, [input.key]: newValue }));
                        }}
                        {...input.inputProps}
                    />
                ))}

                <Button
                    text={action}
                    type='submit'
                    className=' w-full mx-0 text-black bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                />
                <p className='text-red-700 font-md m-2 text-center'>{error ? 'Ошибка: ' + error : ''}</p>

                {children}
            </form>
        </FormLayout>
    );
};
