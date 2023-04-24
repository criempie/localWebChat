import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { localStorage } from '~/App/components/messages/model';
import { IMessage } from '~/App/entities/message';
import Icon from '~/App/ui/icon';

interface Props {
    timestamp: number;
    messageId: IMessage['id'];
}

function _Footer(props: Props) {
    const dateFormat = useMemo(() => {
        const date = new Date(props.timestamp);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }, [ props.timestamp ]);

    const quoteMessage = () => {
        if (props.messageId) {
            localStorage.attachMessage(props.messageId);
        }
    };

    return (
        <div className={ 'footer message__footer' }>
            <Icon.Quote.QuoteBubble onClick={ quoteMessage }
                                    className={ 'message__quote-bubble' }
                                    width={ 16 }
                                    height={ 16 } />
            <div className={ 'message__date' }>{ dateFormat }</div>
        </div>
    );
}

const Footer = observer(_Footer);

export { Footer };