import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import UploadedImagePreview from '../uploaded-image-preview';
import { FileWithID, IFileListFunctions } from '../../model';
import './index.css';

interface Props {}

function FileList(props: Props, ref: ForwardedRef<IFileListFunctions>) {
    const [ files, setFiles ] = useState<FileWithID[]>([]);

    const addFiles = useCallback((files: File[]) => {
        const filesWithIDs = files.map((file, index) => Object.assign(file, { id: Date.now() + index }));

        setFiles((prev) => [ ...prev, ...filesWithIDs ]);
    }, []);

    const clear = useCallback(() => {
        setFiles([]);
    }, []);

    useImperativeHandle(ref, () => ({
        addFiles,
        files,
        clear,
    }), [ files, clear, addFiles ]);

    const removeFile = useCallback((fileId: number) => {
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
    }, []);

    return (
        <div className={ 'file-list' }>
            { render(files, removeFile) }
        </div>
    );
}

function render(files: FileWithID[], removeFileFn: (id: number) => void) {
    return files.map((file) => {
        const src = URL.createObjectURL(file);

        const removeFile = () => removeFileFn(file.id);

        return <UploadedImagePreview key={ file.id } onClick={ removeFile } name={ file.name } src={ src } />;
    });
}

export default forwardRef(FileList);