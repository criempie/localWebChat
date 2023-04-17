import { observer } from 'mobx-react-lite';

import './index.css';
import HomePage from './components/home-page';
import LoginPage from './components/login-page';
import { useStore } from './model';

function App() {
    return (
        <div id={ 'app' }>
            { render() }
        </div>
    )
}

function render() {
    const { user } = useStore();

    if (!user.name) return <LoginPage />
    else return <HomePage />
}

export default observer(App);