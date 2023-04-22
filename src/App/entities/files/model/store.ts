import { action, makeObservable, observable } from 'mobx';

import db from '~/App/entities/database';
import { RootStore } from '~/App/model';
import { IFile } from './types';

class FileStore {
    @observable files: IFile[] = [];

    constructor(private _root: RootStore) {
        makeObservable(this);
    }

    public init() {}

    public async saveMultipleFiles(files: File[] | FileList) {
        const _files: IFile[] = Array.from(files).map((file) => ({ file }));

        return db.files
                 .bulkAdd(_files, { allKeys: true })
                 .then((addedIDs) => {
                     return this._getMultipleFilesFromDB(addedIDs);
                 })
                 .then((files) => {
                     const notNullFiles: Required<IFile>[] = files.filter(
                         (file): file is Required<IFile> => !!file && !!file.id
                     );

                     this._addFilesToBuffer(notNullFiles);

                     return notNullFiles.map((file) => file.id);
                 });
    }

    public async getFile(id: NonNullable<IFile['id']>) {
        const file = this.files.find((file) => file.id === id);

        if (file) return file;

        return db.files.get(id)
                 .then((file) => {
                     if (file) this._addFilesToBuffer(file);
                     return file;
                 });
    }

    private async _getMultipleFilesFromDB(ids: NonNullable<IFile['id']>[]) {
        return db.files.bulkGet(ids);
    }

    @action
    private _addFilesToBuffer(fileOrFiles: IFile | IFile[]) {
        if (fileOrFiles instanceof Array) {
            this.files.push(...fileOrFiles);
        } else {
            this.files.push(fileOrFiles);
        }
    }
}

export { FileStore };