import { IMessage } from '~/App/entities/message';

type Props = Pick<IMessage, 'user' | 'body'>;

function QuoteMessage(props: Props) {
    return (
        <div className={ 'quote' }>
            <div className={ 'quote__username' }>{ props.user.name }</div>
            <div className={ 'quote__body' }>{ props.body }</div>
        </div>
    );
}

export default QuoteMessage;