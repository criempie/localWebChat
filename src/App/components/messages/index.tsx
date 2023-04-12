import { observer } from 'mobx-react-lite';

import './index.css';
import { useStore } from '../../model/context';
import Message from '../message';

function Messages() {

    return (
        <div className={ 'messages-container' }>
            { renderMessages() }
        </div>
    )
}

function renderMessages() {
    const { messages } = useStore();

    return messages.messages.map((msg) => <Message { ...msg } key={ msg.id } />)
}

export default observer(Messages);