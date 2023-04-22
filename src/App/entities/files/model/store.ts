import { action, makeObservable, observable } from 'mobx';

import { IFile } from './types';
import { RootStore } from '~/App/model';

class FileStore {
    @observable files: IFile[] = [];

    constructor(private _root: RootStore) {
        makeObservable(this);
    }

    public init() {}

}

export { FileStore };