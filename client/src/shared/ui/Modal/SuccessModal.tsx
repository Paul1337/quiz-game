import React, { FC } from 'react';
import { Modal } from './Modal';
import { Button } from '../Buttons/Button/Button';

interface SuccessModalProps {
    onClose: () => void;
    message?: string;
}

const DefaultMessage = 'Успешно!';

export const SuccessModal: FC<SuccessModalProps> = props => {
    const { onClose, message = DefaultMessage } = props;
    return (
        <Modal onClose={onClose} className='flex flex-col justify-between min-h-64'>
            <p className='m-2 p-2 text-center text-green-700 font-medium '>{message}</p>
            <div className='flex'>
                <Button onClick={onClose} className='text-green-700 font-medium text-lg flex-1'>
                    ок
                </Button>
            </div>
        </Modal>
    );
};
