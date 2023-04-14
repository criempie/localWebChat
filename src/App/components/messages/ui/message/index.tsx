import './index.css';
import { IMessage } from '../../../../model';
import * as Icon from '../../../icon';

type Props = Pick<IMessage, 'body'>;

function Message(props: Props) {
    return (
        <div className={ 'chat__message' }>
            <div className={ 'chat__message-avatar' }><Icon.Avatar width={ 24 } height={ 24 } /></div>
            <div className={ 'chat__message-body' }>{ props.body }</div>
        </div>
    )
}

export default Message;