import './index.css';
import MessageInput from './components/message-input';
import Messages from './components/messages';

function App() {
    return (
        <div id={'app'}>
            <Messages />
            <MessageInput />
        </div>
    )
}

export default App;