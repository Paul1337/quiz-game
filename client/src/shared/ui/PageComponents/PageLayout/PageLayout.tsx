import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PageLayoutProps {
    className?: string;
    children: ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = props => {
    const { className, children } = props;
    return (
        <div
            className={twMerge(
                'flex flex-col justify-start h-full m-0 p-1 md:py-4 md:px-10 lg:py-6 lg:px-20 relative z-10',
                className
            )}
        >
            {children}
        </div>
    );
};
