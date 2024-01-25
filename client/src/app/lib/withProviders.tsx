import React from 'react';
import { StoreProvider } from '../providers/StoreProvider/StoreProvider';
import { AuthProvider } from '../../auth/providers/AuthProvider/AuthProvider';

export const withProviders = (component: React.FunctionComponent) => (props: any) => {
    return (
        <StoreProvider>
            <AuthProvider>{component(props)}</AuthProvider>
        </StoreProvider>
    );
};
