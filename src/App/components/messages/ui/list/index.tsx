import { observer } from 'mobx-react-lite';

import './index.css';
import { useStore } from '../../../../model';
import Message from '../message';

function List() {

    return (
        <div className={ 'chat__messages-list' }>
            { renderMessages() }
        </div>
    )
}

function renderMessages() {
    const { messages } = useStore();

    return messages.messages.map((msg) => <Message { ...msg } key={ msg.id } />)
}

export default observer(List);