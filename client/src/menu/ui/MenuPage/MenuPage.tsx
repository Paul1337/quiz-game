import React, { useState } from 'react';
import Selector from '../../../shared/ui/Selector/Selector';
import { Button } from '../../../shared/ui/Button/Button';

interface GameSettingsScheme {
    difficulty: string;
    mode: string;
}

const DefaultGameSettings: GameSettingsScheme = {
    difficulty: 'Средне',
    mode: 'Классика',
};

export const MenuPage = () => {
    const [gameSettings, setGameSettings] = useState<GameSettingsScheme>(DefaultGameSettings);

    return (
        <div>
            <h1>Игровое меню</h1>
            <Button>профиль</Button>
            <div className='flex items-center justify-center gap-2'>
                <div>
                    <Selector
                        className='m-4'
                        label='Выбор сложности'
                        options={['Легко', 'Средне', 'Сложно']}
                        defaultOption={DefaultGameSettings.difficulty}
                        onChange={difficulty =>
                            setGameSettings(settings => ({ ...settings, difficulty }))
                        }
                    />
                    <Selector
                        className='m-4'
                        label='Выбор режима игры'
                        options={['Классика', 'Блиц', 'До первой ошибки']}
                        defaultOption={DefaultGameSettings.mode}
                        onChange={mode => setGameSettings(settings => ({ ...settings, mode }))}
                    />
                </div>
                <p className='p-2 text-base'>описание варианта игры</p>
            </div>
            <div className='text-center mt-2'>
                <Button>Начать игру</Button>
            </div>
        </div>
    );
};
