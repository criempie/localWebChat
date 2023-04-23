import { useEffect, useMemo, useState } from 'react';
import { IFile } from '~/App/entities/files';
import { IMessage } from '~/App/entities/message';
import { useStore } from '~/App/model';
import Icon from '~/App/ui/icon';

import { Gallery } from './gallery';
import { Header } from './header';

import './index.css';

type Props = Pick<IMessage, 'body' | 'user' | 'timestamp' | 'id' | 'attachments'> & {
    deleteMessage: (messageId: IMessage['id']) => void;
};

function Message(props: Props) {
    const [ attachments, setAttachments ] = useState<IFile[]>([]);
    const { files } = useStore();

    const dateFormat = useMemo(() => {
        const date = new Date(props.timestamp);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }, [ props.timestamp ]);

    const deleteMessage = () => {
        props.deleteMessage(props.id);
    };

    useEffect(() => {
        if (props.attachments) {
            files.getMultipleFiles(props.attachments)
                 .then((files) => setAttachments(files));
        }
    }, [ props.attachments ]);

    return (
        <div className={ 'message' }>
            <div className={ 'message__avatar' }>
                <Icon.Avatar width={ 24 } height={ 24 } />
            </div>
            <div className={ 'message__body' }>
                <Header username={ props.user.name } deleteMessage={ deleteMessage } />

                <div className={ 'message__text' }>{ props.body }</div>

                <Gallery attachments={ attachments } />

                <div className={ 'message__date' }>{ dateFormat }</div>
            </div>
        </div>
    )
        ;
}

export default Message;