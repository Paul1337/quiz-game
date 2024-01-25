import classNames from 'classnames';
import { FC } from 'react';
import { ButtonProps as BtnProps } from 'react-html-props';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends BtnProps {
    text?: string;
}

export const Button: FC<ButtonProps> = props => {
    const { text, disabled, className, children, ...otherProps } = props;
    return (
        <button
            className={twMerge(
                classNames(
                    'hover:bg-[#FFFAE6] hover:border-main-transparent p-2 rounded-md text-center m-2 border border-main  ',
                    {
                        'cursor-not-allowed opacity-50 hover:border-main hover:bg-none': disabled,
                    }
                ),
                className ?? ''
            )}
            {...otherProps}
        >
            {text ?? children}
        </button>
    );
};
