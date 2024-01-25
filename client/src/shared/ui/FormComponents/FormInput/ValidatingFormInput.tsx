import React, { FC } from 'react';
import { FormInput, FormInputProps, ValidationScheme } from './FormInput';

export interface ValidatingFormInputProps extends Omit<FormInputProps, 'validations'> {
    length?: [number, number];
    minLength?: number;
    isEmail?: boolean;
    extraValidations?: Array<ValidationScheme>;
}

export const ValidatingFormInput: FC<ValidatingFormInputProps> = props => {
    const { length, minLength, isEmail, extraValidations = [], ...otherProps } = props;

    const validations: ValidationScheme[] = [];
    if (length) {
        const [min, max] = length;
        validations.push({
            descr: `Длина должна быть от ${min} до ${max} символов`,
            validate: val => val.length >= min && val.length <= max,
        });
    } else if (minLength) {
        validations.push({
            descr: `Длина должна быть от ${minLength} символов`,
            validate: val => val.length >= minLength,
        });
    }

    if (isEmail) {
        validations.push({
            descr: `Это должен быть валидный email`,
            validate: val => val.indexOf('@') > 0 && val.indexOf('@') < val.length - 1,
        });
    }

    return <FormInput {...otherProps} validations={validations.concat(extraValidations)} />;
};
