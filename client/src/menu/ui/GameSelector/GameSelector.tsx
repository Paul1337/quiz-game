import React, { FC } from 'react';
import Selector from '../../../shared/ui/Selector/Selector';
import {
    DefaultGameSettings,
    gameDifficulties,
    gameModes,
} from '../../../app/config/gameSettings/gameSettings';
import { useAppDispatch } from '../../../app/store/store.model';
import { gameSettingsActions } from '../../slices/gameSettingsSlice';
import { GameDifficulty, GameMode } from '../../../app/config/gameSettings/gameSettings.model';

interface GameSelectorProps {
    className?: string;
}

export const GameSelector: FC<GameSelectorProps> = props => {
    const dispatch = useAppDispatch();
    const { className } = props;

    return (
        <div className={className}>
            <Selector
                className='m-4 text-center sm:text-left'
                label='Выбор режима игры'
                options={gameModes}
                defaultOption={DefaultGameSettings.mode}
                onChange={mode => dispatch(gameSettingsActions.setMode(mode as GameMode))}
            />
            <Selector
                className='m-4 text-center sm:text-left'
                label='Выбор сложности'
                options={gameDifficulties}
                defaultOption={DefaultGameSettings.difficulty}
                onChange={difficulty =>
                    dispatch(gameSettingsActions.setDifficulty(difficulty as GameDifficulty))
                }
            />
        </div>
    );
};
