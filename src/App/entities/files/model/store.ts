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

    public async deleteMultipleFiles(ids: IFile['id'][]) {
        const _notNullIDs = this._filterNotNullable(ids);

        return db.files.bulkDelete(_notNullIDs);
    }

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

    public async getMultipleFiles(ids: NonNullable<IFile['id']>[]) {
        const alreadyContainsFileIds: NonNullable<IFile['id']>[] = [];

        const filesFromBuffer = this.files.reduce((acc: IFile[], file) => {
            if (file.id && ids.includes(file.id)) {
                alreadyContainsFileIds.push(file.id);

                return [ ...acc, file ];
            } else {
                return acc;
            }
        }, []);

        const remainIds = ids.slice();
        for (let i = remainIds.length - 1; i >= 0; i--) {
            if (alreadyContainsFileIds.includes(remainIds[i])) {
                remainIds.splice(i, 1);
            }
        }

        return this._getMultipleFilesFromDB(remainIds)
                   .then((files) => {
                       const _files = this._filterNotNullable(files);

                       return [ ..._files, ...filesFromBuffer ];
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

    private _filterNotNullable<T>(arr: Array<T>) {
        return arr.filter((item): item is NonNullable<T> => !!item)
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