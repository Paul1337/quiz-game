import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, ButtonProps } from './Button';

export interface PlayButtonProps extends ButtonProps {}

export const PlayButton: FC<PlayButtonProps> = props => {
    const { className, ...otherProps } = props;
    return (
        <Button
            className={twMerge('border-gray-800 text-xl font-medium text-green-700', className)}
            {...otherProps}
        />
    );
};
