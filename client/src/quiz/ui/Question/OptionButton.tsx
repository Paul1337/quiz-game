import React, { FC, useEffect } from 'react';
import { Button, ButtonProps } from '../../../shared/ui/Buttons/Button/Button';
import classNames from 'classnames';
import { AnswerStatus } from '../../slices/quizSlice.model';

export interface OptionButtonProps extends ButtonProps {
    onClick?: () => void;
    isSelected: boolean;
    answerStatus?: AnswerStatus;
}

export const OptionButton: FC<OptionButtonProps> = props => {
    const { onClick, isSelected, answerStatus = AnswerStatus.NotGiven, ...other } = props;

    return (
        <Button
            className={classNames('min-w-4 font-normal', {
                'border-orange-500 shadow-md shadow-orange-500':
                    isSelected && answerStatus === AnswerStatus.NotGiven,
                'bg-green-400 hover:bg-green-400': answerStatus === AnswerStatus.IsRight,
                'bg-red-400 hover:bg-red-400': answerStatus === AnswerStatus.IsWrong,
            })}
            onClick={onClick}
            {...other}
        />
    );
};
