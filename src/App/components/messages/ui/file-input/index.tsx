import { observer } from 'mobx-react-lite';
import { ChangeEvent, useRef, useState } from 'react';

import './index.css';
import Icon from '~/App/ui/icon';
import IconButton from '~/App/ui/icon-button';

interface Props {
    addFiles: (files: File[]) => void;
}

function FileInput(props: Props) {
    const { addFiles } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            addFiles(Array.from(event.target.files));

            if (inputRef.current) {
                inputRef.current.value = '';
                console.log(123);
            }
        }
    };

    return (
        <label className={ 'file-input' }>
            <IconButton>
                <Icon.Upload className={ 'file-input__icon' } width={ 32 } height={ 32 } />
            </IconButton>

            <input onChange={ handleChange } className={ 'hidden' } type={ 'file' } ref={inputRef} multiple accept="image/*" />
        </label>
    );
}

export default observer(FileInput);