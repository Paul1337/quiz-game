import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormLayoutProps {
    className?: string;
    children: ReactNode;
}

export const FormLayout: FC<FormLayoutProps> = ({ children, className }) => {
    return (
        <section className={twMerge('bg-second-bg w-full h-full max-h-full')}>
            <div className='flex flex-col items-center h-full justify-center px-2 py-4 mx-auto lg:py-0'>
                <div className='w-full max-h-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div
                        className={twMerge(
                            'border rounded-md max-h-full overflow-y-auto border-[#71627A] p-2 space-y-2 md:space-y-4 sm:p-8',
                            className
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};
