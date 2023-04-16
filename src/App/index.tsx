import './index.css';
import LoginPage from './components/login-page';
import Messages from './components/messages';
import Rooms from './components/rooms';

function App() {
    return (
        <div id={ 'app' }>
            <LoginPage />
            {/*<div className={ 'home-page' }>*/ }
            {/*    <Rooms />*/ }
            {/*    <Messages />*/ }
            {/*</div>*/ }
        </div>
    )
}

export default App;