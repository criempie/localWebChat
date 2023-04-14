import { useRef } from 'react';

import './index.css';
import { useStore } from '../../../../model';
import * as Icon from '../../../icon';

function MessageInput() {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { messages } = useStore();

    const submit = () => {
        // messages.addMessage({ body: inputRef.current?.value || '' });
    }

    return (
        <div className={ 'message-input' }>
            <label className={ 'message-input__container' }>
                <textarea className={ 'message-input__input' }
                          ref={ inputRef }
                          placeholder={ 'Введите сообщение...' }
                          rows={ 1 } />
            </label>
            <div className={ 'message-input__button' } onClick={ submit }>
                <Icon.ArrowSend width={ 32 } height={ 32 } />
            </div>
        </div>
    )
}

export default MessageInput;