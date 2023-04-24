import { observer } from 'mobx-react-lite';
import { KeyboardEvent as KeyboardEvent_React, useCallback, useRef } from 'react';

import { IFileListFunctions, localStorage } from '~/App/components/messages/model';
import FileInput from '~/App/components/messages/ui/file-input';
import FileList from '~/App/components/messages/ui/file-list';
import MessageToQuote from '~/App/components/messages/ui/message-to-quote';
import QuoteMessage from '~/App/components/messages/ui/quote-message';
import { IFile } from '~/App/entities/files';
import { IAttachment } from '~/App/entities/message';
import { useStore } from '~/App/model';
import Icon from '~/App/ui/icon';
import IconButton from '~/App/ui/icon-button';
import './index.css';

function MessageInput() {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileListRef = useRef<IFileListFunctions>(null);

    const { messages, files } = useStore();

    const clearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const submit = async () => {
        if (!inputRef.current?.value || !inputRef.current.value.trim()) return;

        let attachments: IAttachment[] = [];

        if (fileListRef.current?.files) {
            const savedFiles = await files.saveMultipleFiles(fileListRef.current.files);

            attachments = savedFiles.map((fileID) => ({ type: 'image', fileID }));
        }

        if (localStorage.attachedMessage) {
            attachments.push({ type: 'message', messageID: localStorage.attachedMessage.id! });
        }

        messages.createMessage({ body: inputRef.current.value }, attachments)
                .then(clearInput)
                .then(fileListRef.current?.clear)
                .then(() => localStorage.detachMessage());
    };

    const keyPressHandle = (event: KeyboardEvent_React<HTMLTextAreaElement>) => {
        switch (event.key) {
            case 'Enter': {
                if (event.ctrlKey) {
                    if (inputRef.current) inputRef.current.value += '\n';
                } else {
                    event.preventDefault();
                    submit();
                }
            }
        }
    };

    const addFilesToList = useCallback((files: File[]) => {
        if (!fileListRef.current) return;

        fileListRef.current.addFiles(files);
    }, []);

    return (
        <>
            {
                localStorage.attachedMessage
                    ? (
                        <MessageToQuote />
                    ) : null
            }

            <div className={ 'message-input' }>
                <label className={ 'message-input__container' }>
                <textarea className={ 'message-input__input' }
                          ref={ inputRef }
                          onKeyDown={ keyPressHandle }
                          placeholder={ 'Введите сообщение...' }
                          rows={ 1 } />
                </label>

                <FileInput addFiles={ addFilesToList } />

                <IconButton onClick={ submit }>
                    <Icon.ArrowSend width={ 32 } height={ 32 } />
                </IconButton>

                <FileList ref={ fileListRef } />
            </div>
        </>
    );
}

export default observer(MessageInput);