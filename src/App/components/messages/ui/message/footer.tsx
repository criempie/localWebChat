import { useMemo } from 'react';
import Icon from '~/App/ui/icon';

interface Props {
    timestamp: number;
}

function Footer({ timestamp }: Props) {
    const dateFormat = useMemo(() => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }, [ timestamp ]);

    return (
        <div className={ 'footer message__footer' }>
            <Icon.Quote.QuoteBubble className={ 'message__quote-bubble' } width={ 16 } height={ 16 } />
            <div className={ 'message__date' }>{ dateFormat }</div>
        </div>
    );
}

export { Footer };