import React from 'react';

export const GlobalBackground = () => {
    return (
        <div
            className='w-full h-full bg-cover bg-center -z-10 absolute left-0 top-0 opacity-100 blur-3xl bg-orange-100'
            // style={{ backgroundImage: `url(${bgImg})` }}
        ></div>
    );
};
