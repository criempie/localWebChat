import './index.css';
import Rooms from './components/rooms';

function App() {
    return (
        <div id={ 'app' }>
            <div className={ 'home-page' }>
                <Rooms />
            </div>
            {/*<Messages />*/ }
            {/*<MessageInput />*/ }
        </div>
    )
}

export default App;