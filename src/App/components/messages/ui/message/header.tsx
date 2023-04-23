import Icon from '~/App/ui/icon';

interface Props {
    username: string;
    deleteMessage: () => void;
}

function Header({ username, deleteMessage }: Props) {
    return (
        <div className={ 'header message__header' }>
            <div className={ 'message__username' }>{ username }</div>

            <Icon.Cross width={ 16 } height={ 16 }
                        className={ 'message__cross' }
                        onClick={ deleteMessage }
            />
        </div>
    );
}

export { Header };