import './index.css';
import Messages from './components/messages';
import Rooms from './components/rooms';

function App() {
    return (
        <div id={ 'app' }>
            <div className={ 'home-page' }>
                <Rooms />
                <Messages />
            </div>
        </div>
    )
}

export default App;