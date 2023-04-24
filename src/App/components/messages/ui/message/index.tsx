import { useEffect, useState } from 'react';
import { Footer } from '~/App/components/messages/ui/message/footer';
import QuoteMessage from '~/App/components/messages/ui/quote-message';
import { IFile } from '~/App/entities/files';
import { IAttachmentLoaded, IMessage } from '~/App/entities/message';
import { filterImageAttachments, filterMessageAttachments } from '~/App/entities/message/lib';
import { useStore } from '~/App/model';
import Icon from '~/App/ui/icon';

import { Gallery } from './gallery';
import { Header } from './header';

import './index.css';

type Props = Pick<IMessage, 'body' | 'user' | 'timestamp' | 'id' | 'attachments'> & {
    deleteMessage: (messageId: IMessage['id']) => void;
};

function Message(props: Props) {
    const [ loadedImageAttachments, setLoadedImageAttachments ] = useState<IFile[]>([]);
    const [ loadedMessageAttachment, setLoadedMessageAttachment ] = useState<IMessage | null>(null);

    const { files, messages } = useStore();

    const deleteMessage = () => {
        props.deleteMessage(props.id);
    };

    useEffect(() => {
        if (props.attachments) {
            const imageIDs = filterImageAttachments(props.attachments).map((img) => img.fileID);

            if (imageIDs.length > 0) {
                files.getMultipleFiles(imageIDs)
                     .then((files) => {
                         setLoadedImageAttachments(files);
                     });
            }

            const messageID = filterMessageAttachments(props.attachments)?.messageID;

            if (messageID) {
                messages.getMessage(messageID)
                        .then((msg) => {
                            if (msg) setLoadedMessageAttachment(msg);
                        });
            }
        }
    }, [ props.attachments ]);

    return (
        <div className={ 'message' }>
            <div className={ 'message__avatar' }>
                <Icon.Avatar width={ 24 } height={ 24 } />
            </div>
            <div className={ 'message__body' }>
                <Header username={ props.user.name } deleteMessage={ deleteMessage } />

                {
                    loadedMessageAttachment
                        ? (
                            <div className={ 'message__quote' }>
                                <QuoteMessage body={ loadedMessageAttachment.body } user={ props.user } />
                            </div>
                        ) : null
                }


                <div className={ 'message__text' }>{ props.body }</div>

                <Gallery attachments={ loadedImageAttachments } />

                <Footer timestamp={ props.timestamp } messageId={ props.id } />
            </div>
        </div>
    );
}

export default Message;