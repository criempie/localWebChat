import { useRef } from 'react';

import { useStore } from '../../model';

function MessageInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { messages } = useStore();

    const submit = () => {
        messages.addMessage({ body: inputRef.current?.value || '' });
    }

    return (
        <div>
            <input ref={ inputRef } />
            <button onClick={ submit }>Отправить</button>
        </div>
    )
}

export default MessageInput;