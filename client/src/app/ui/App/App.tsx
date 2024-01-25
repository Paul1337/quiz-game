import { withProviders } from '../../lib/withProviders';
import { AppRouter } from '../AppRouter/AppRouter';
import '../../styles/App.css';
import { GlobalBackground } from '../GlobalBackground/GlobalBackground';

export const App = withProviders(() => {
    return (
        <>
            <GlobalBackground />
            <AppRouter></AppRouter>
        </>
    );
});
