import { useRef, KeyboardEvent as KeyboardEvent_React } from 'react';

import './index.css';
import { useStore } from '../../../../model';
import * as Icon from '../../../icon';

function MessageInput() {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { messages } = useStore();

    const clearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const submit = () => {
        if (!inputRef.current?.value || !inputRef.current.value.trim()) return;

        messages.createMessage({ body: inputRef.current.value })
                .then(clearInput)
    }

    const keyPressHandle = (event: KeyboardEvent_React<HTMLTextAreaElement>) => {
        switch (event.key) {
            case 'Enter': {
                if (event.ctrlKey) {
                    if (inputRef.current) inputRef.current.value += '\n';
                } else {
                    event.preventDefault();
                    submit()
                }
            }
        }
    }

    return (
        <div className={ 'message-input' }>
            <label className={ 'message-input__container' }>
                <textarea className={ 'message-input__input' }
                          ref={ inputRef }
                          onKeyDown={ keyPressHandle }
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