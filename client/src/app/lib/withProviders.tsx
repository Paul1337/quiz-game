import React from 'react';
import { StoreProvider } from '../providers/StoreProvider/StoreProvider';
import { LoadingProvider } from '../providers/LoadingProvider/LoadingProvider';

export const withProviders = (component: React.FunctionComponent) => (props: any) => {
    return (
        <StoreProvider>
            <LoadingProvider>{component(props)}</LoadingProvider>
        </StoreProvider>
    );
};
