import classNames from 'classnames';
import { ChangeEvent, FC, useEffect, useState } from 'react';

export type ValidationFunc = (value: string) => boolean;
export type ValidationDescr = string;
export type ValidationScheme = { validate: ValidationFunc; descr: ValidationDescr };

export enum FormInputVariant {
    Textarea = 'textarea',
    Input = 'input',
    Select = 'select',
}

export interface FormInputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    name?: string;
    validations?: Array<ValidationScheme>;
    type?: string;
    as?: FormInputVariant;
}

export const FormInput: FC<FormInputProps> = props => {
    const {
        onChange,
        value,
        name,
        label,
        placeholder = props.label,
        validations,
        type = 'text',
        as = FormInputVariant.Input,
    } = props;
    const [validationError, setValidationError] = useState('');

    const handleChange = (e: ChangeEvent<any>) => {
        onChange(e.target.value);
    };

    useEffect(() => {
        if (validations) {
            for (const { validate, descr } of validations) {
                if (!validate(value)) {
                    setValidationError(descr);
                    return;
                }
            }
            setValidationError('');
        }
    }, [value]);

    return (
        <div>
            <label
                htmlFor={name}
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
                {label}
            </label>
            {as === FormInputVariant.Input ? (
                <input
                    type={type}
                    name={name}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            ) : as === FormInputVariant.Textarea ? (
                <textarea
                    name={name}
                    className='bg-gray-50 resize-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder={placeholder}
                    value={value}
                    rows={3}
                    onChange={handleChange}
                ></textarea>
            ) : (
                <select
                    name={name}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    value={value}
                    onChange={handleChange}
                ></select>
            )}

            {validationError && (
                <p
                    className={classNames('text-red-700 text-sm m-0.5 transition-none', {
                        'opacity-0': !validationError,
                    })}
                >
                    {validationError || 'пусто'}
                </p>
            )}
        </div>
    );
};
