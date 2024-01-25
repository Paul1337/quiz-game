import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PageHeaderProps {
    className?: string;
    children: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = props => {
    const { children, className } = props;
    return (
        <div
            className={twMerge('bg-main-bg p-2 flex justify-between items-center rounded-md', className)}
        >
            {children}
        </div>
    );
};
