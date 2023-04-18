import { observer } from 'mobx-react-lite';

import './index.css';
import { useCallback } from 'react';
import { IMessage, useStore } from '../../../../model';
import DateSeparator from '../date-separator';
import Message from '../message';

function List() {

    return (
        <div className={ 'messages' }>
            { renderMessages() }
        </div>
    )
}

function renderMessages() {
    const { messages } = useStore();
    const result = [];
    let lastDate: Date | undefined;

    const deleteMessage = useCallback((messageId: IMessage['id']) => {
        if (messageId) {
            return messages.deleteMessage(messageId);
        }
    }, [])

    for (const msg of messages.messages) {
        const date = new Date(msg.timestamp);
        date.setHours(0, 0, 0, 0);

        if (!lastDate || date.getTime() > lastDate.getTime()) {
            result.push(<DateSeparator timestamp={ date.getTime() } key={ date.getTime() } />);
            lastDate = date;
        }

        result.push(<Message { ...msg } deleteMessage={ deleteMessage } key={ msg.id } />)
    }

    return result;
}

export default observer(List);