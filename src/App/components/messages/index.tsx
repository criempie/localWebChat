import './index.css';
import MessageInput from './ui/input';
import List from './ui/list';

function Messages() {
    return (
        <div className={ 'chat' }>
            <List />
            <MessageInput />
        </div>
    )
}

export default Messages;