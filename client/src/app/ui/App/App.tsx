import { withProviders } from '../../lib/withProviders';
import { AppRouter } from '../AppRouter/AppRouter';
import './App.css';

const App = () => {
    return <AppRouter></AppRouter>;
};

export default withProviders(App);
