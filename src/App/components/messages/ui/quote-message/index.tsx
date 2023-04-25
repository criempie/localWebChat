import { IMessage } from '~/App/entities/message';
import './index.css';

type Props = Pick<IMessage, 'user' | 'body' | 'id'>;

function QuoteMessage(props: Props) {
    const goTo = () => {
        location.href = `#message_${ props.id }`;
    };

    return (
        <div className={ 'quote' } onClick={ goTo }>
            <div className={ 'quote__username' }>{ props.user.name }</div>
            <div className={ 'quote__body' }>{ props.body }</div>
        </div>
    );
}

export default QuoteMessage;