import { FC, useState } from 'react';
import downArrowImg from '../../assets/down-arrow.svg';
import upArrowImg from '../../assets/up-arrow.svg';
import checkMarkImg from '../../assets/check-mark.svg';
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
                    className='flex relative items-center justify-between flex-row min-w-52 border rounded-md p-2 border-gray-200'
                    onClick={handleSelectClick}
                >
                    <p className='m-2 text-lg'>{selected}</p>
                    <span className='block relative w-6 h-6 border-black rounded-md cursor-pointer'>
                        <span
                            style={{
                                backgroundImage: `url(${showOptions ? upArrowImg : downArrowImg})`,
                            }}
                            className={classNames(
                                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block bg-cover bg-center w-4 h-4 rounded-md'
                            )}
                        ></span>
                    </span>

                    {showOptions && (
                        <div className='absolute z-10 left-[-1px] top-[60px] bg-white border border-gray-200 rounded-md p-2 whitespace-nowrap'>
                            {options.map(option => (
                                <div
                                    className='p-2 text-lg rounded-md hover:bg-gray-200 cursor-pointer flex items-center justify-between'
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleOptionClick(option);
                                    }}
                                >
                                    <span>{option}</span>
                                    <span
                                        style={{
                                            backgroundImage:
                                                option === selected ? `url(${checkMarkImg})` : 'unset',
                                        }}
                                        className='bg-cover bg-center w-4 h-4 ml-4 inline-block'
                                    ></span>
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
