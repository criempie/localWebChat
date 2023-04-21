import { observer } from 'mobx-react-lite';

import './index.css';
import { useStore } from '~/App/model';
import LoginPage from '~/App/pages/login-page';
import MainPage from '~/App/pages/main-page';

function App() {
    return (
        <div id={ 'app' }>
            { render() }
        </div>
    );
}

function render() {
    const { user } = useStore();

    if (!user.name) return <LoginPage />;
    else return <MainPage />;
}

export default observer(App);