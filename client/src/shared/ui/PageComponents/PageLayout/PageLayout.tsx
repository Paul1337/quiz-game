import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PageLayoutProps {
    className?: string;
    children: ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = props => {
    const { className, children } = props;
    return <div className={twMerge('my-6 mx-20 relative z-10', className)}>{children}</div>;
};
