import { FC, useState } from 'react';
import DownArrowLogo from '../../assets/down-arrow.svg?react';
import UpArrowLogo from '../../assets/up-arrow.svg?react';
import CheckMarkLogo from '../../assets/check-mark.svg?react';
import classNames from 'classnames';

interface SelectorProps {
    label: string;
    options: string[];
    defaultOption?: string;
    onChange?: (value: string) => void;
    className?: string;
}

const Selector: FC<SelectorProps> = props => {
    const { label, options, defaultOption, onChange, className } = props;
    const [selected, setSelected] = useState(defaultOption ?? options[0]);
    const [showOptions, setShowOptions] = useState(false);

    const handleSelectClick = () => {
        setShowOptions(show => !show);
    };

    const handleOptionClick = (option: string) => {
        setSelected(option);
        setShowOptions(false);
        onChange?.(option);
    };

    return (
        <div className={className}>
            <div className='inline-flex flex-col'>
                <h3 className='text-left text-xl font-medium'>{label}</h3>
                <div
                    className='flex relative items-center justify-between flex-row min-w-52 border rounded-md p-1 border-gray-300 mt-2'
                    onClick={handleSelectClick}
                >
                    <p className='m-2 text-lg'>{selected}</p>
                    <span className='block relative w-6 h-6 mr-1 rounded-md cursor-pointer'>
                        {showOptions ? (
                            <UpArrowLogo
                                className={classNames(
                                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block bg-cover bg-center w-4 h-4 rounded-md'
                                )}
                            />
                        ) : (
                            <DownArrowLogo
                                className={classNames(
                                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block bg-cover bg-center w-4 h-4 rounded-md'
                                )}
                            />
                        )}
                    </span>

                    {showOptions && (
                        <div className='absolute z-10 left-[-1px] top-[52px] bg-white border border-gray-300 rounded-md p-2 whitespace-nowrap'>
                            {options.map(option => (
                                <div
                                    key={option}
                                    className='p-2 text-lg rounded-md hover:bg-gray-300 cursor-pointer flex items-center justify-between'
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleOptionClick(option);
                                    }}
                                >
                                    <span>{option}</span>
                                    <CheckMarkLogo
                                        className={classNames('bg-cover bg-center w-4 h-4 ml-4 inline-block', {
                                            'opacity-0': option !== selected,
                                        })}
                                    ></CheckMarkLogo>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Selector;
