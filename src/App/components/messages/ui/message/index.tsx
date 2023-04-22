import { useEffect, useMemo, useState } from 'react';

import './index.css';
import { IFile } from '~/App/entities/files';
import { IMessage } from '~/App/entities/message';
import { useStore } from '~/App/model';
import Icon from '~/App/ui/icon';
import ImageGallery from '~/App/ui/image-gallery';

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
                <div className={ 'header message__header' }>
                    <div className={ 'message__username' }>{ props.user.name }</div>
                    <Icon.Cross width={ 16 } height={ 16 }
                                className={ 'message__cross' }
                                onClick={ deleteMessage } />
                </div>

                <div className={ 'message__text' }>{ props.body }</div>

                <div className={ 'message__image-gallery' }>
                    {
                        attachments.length > 0 ?
                            <ImageGallery images={ attachments } /> :
                            null
                    }
                </div>

                <div className={ 'message__date' }>{ dateFormat }</div>
            </div>
        </div>
    );
}

export default Message;