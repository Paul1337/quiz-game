import React from 'react';
import { useAppSelector } from '../../../app/store/store.model';
import { GameDesciptions } from './descriptions';

export const GameDescription = () => {
    const gameMode = useAppSelector(state => state.gameSettings.mode);

    return (
        <div className='overflow-auto px-14 pt-4 text-lg w-72 flex-1 rounded-md m-2 text-center border border-main-transparent bg-second-bg'>
            <p className='whitespace-pre-wrap h-full'>{GameDesciptions[gameMode]}</p>
        </div>
    );
};
