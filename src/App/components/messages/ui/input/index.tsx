import { KeyboardEvent as KeyboardEvent_React, useCallback, useRef } from 'react';

import { IFileListFunctions } from '~/App/components/messages/model';
import FileInput from '~/App/components/messages/ui/file-input';
import FileList from '~/App/components/messages/ui/file-list';
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

        let attachments: IAttachment<'image'>[] = [];

        if (fileListRef.current?.files) {
            attachments = (await files.saveMultipleFiles(fileListRef.current.files)).map(
                (fileID) => ({ type: 'image', fileID })
            );
        }

        messages.createMessage({ body: inputRef.current.value }, attachments)
                .then(clearInput)
                .then(fileListRef.current?.clear);
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
            <FileList ref={ fileListRef } />
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

                {/*<div className={ 'message-input__button' } onClick={ submit }>*/ }
                {/*    */ }
                {/*</div>*/ }
            </div>
        </>
    );
}

export default MessageInput;