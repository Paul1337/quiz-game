import React, { FC, PropsWithChildren } from 'react';

export const FormLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <section className='bg-[#f9f3e8] '>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div className='border rounded-md border-[#71627A] p-6 space-y-4 md:space-y-6 sm:p-8'>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};
