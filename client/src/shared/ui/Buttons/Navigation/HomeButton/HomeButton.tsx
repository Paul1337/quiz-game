import { FC } from 'react';
import HomeLogo from '../../../../assets/home.svg?react';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { MenuRotes } from '../../../../../menu/routes/menuRoutes';

interface HomeButtonProps {
    className?: string;
}

export const HomeButton: FC<HomeButtonProps> = props => {
    const { className } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(MenuRotes.Menu);
    };

    return (
        <HomeLogo
            className={twMerge(
                'block w-8 h-8 bg-cover bg-center cursor-pointer hover:opacity-80 invert-[42%] sepia-[1%] saturate-[842%] hue-rotate-[39deg] brightness-[92%] contrast-[89%]',
                className
            )}
            onClick={handleClick}
        ></HomeLogo>
    );
};
