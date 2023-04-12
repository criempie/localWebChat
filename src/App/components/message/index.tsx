import './index.css';
import { IMessage } from '../../model';
import * as Icon from '../icon';

type Props = Pick<IMessage, 'body'>;

function Message(props: Props) {
    return (
        <div className={ 'messages-container__message' }>
            <div className={ 'messages-container__message-avatar' }><Icon.Avatar width={ 24 } height={ 24 } /></div>
            <div className={ 'messages-container__message-body' }>{ props.body }</div>
        </div>
    )
}

export default Message;