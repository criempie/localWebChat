import './index.css';
import { useMemo } from 'react';
import { IMessage } from '../../../../model';
import * as Icon from '../../../icon';

type Props = Pick<IMessage, 'body' | 'user' | 'timestamp'>;

function Message(props: Props) {
    const dateFormat = useMemo(() => {
        const date = new Date(props.timestamp);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }, [ props.timestamp ])

    return (
        <div className={ 'message' }>
            <div className={ 'message__avatar' }>
                <Icon.Avatar width={ 24 } height={ 24 } />
            </div>
            <div className={ 'message__body' }>
                <div className={ 'message__username' }>{ props.user.name }</div>
                <div className={ 'message__text' }>{ props.body }</div>
                <div className={ 'message__date' }>{ dateFormat }</div>
            </div>
        </div>
    )
}

export default Message;