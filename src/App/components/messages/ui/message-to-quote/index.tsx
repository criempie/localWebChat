import { observer } from 'mobx-react-lite';

import './index.css';
import { localStorage } from '~/App/components/messages/model';

function MessageToQuote() {
    return (
        <div className={ 'message-to-quote' }>
            <div className={ 'message-to-quote__username' }>{ localStorage.attachedMessage?.user.name }</div>
            <div className={ 'message-to-quote__body' }>{ localStorage.attachedMessage?.body }</div>
        </div>
    );
}

export default observer(MessageToQuote);