import { observer } from 'mobx-react-lite';

import { useStore } from '../../model/context';

function Messages() {

    return (
        <div>
            { renderMessages() }
        </div>
    )
}

function renderMessages() {
    const { messages } = useStore();

    return messages.messages.map((msg) => <div key={ msg.id }>{ msg.body }</div>)
}

export default observer(Messages);