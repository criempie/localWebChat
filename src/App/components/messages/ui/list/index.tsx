import { observer } from 'mobx-react-lite';

import './index.css';
import { useStore } from '../../../../model';
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

    for (const msg of messages.messages) {
        const date = new Date(msg.timestamp);
        date.setHours(0, 0, 0, 0);

        if (!lastDate || date.getTime() > lastDate.getTime()) {
            result.push(<DateSeparator timestamp={ date.getTime() } key={ date.getTime() } />);
            lastDate = date;
        }

        result.push(<Message { ...msg } key={ msg.id } />)
    }

    return result;
}

export default observer(List);