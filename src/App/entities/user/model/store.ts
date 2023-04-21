import { action, makeObservable, observable } from 'mobx';

import { GUIError } from '~/App/entities/error';
import { RootStore } from '~/App/model';

class UserStore {
    @observable name: string | null = null;

    constructor(private _root: RootStore) {
        makeObservable(this);
    }

    public init() {}

    public logout() {
        this._setName(null);
        this._root.rooms.clearCurrentRoom();
    }

    public setName(name?: string) {
        const minLength = 3;

        if (!name || name.length < minLength) {
            throw new GUIError(`Длина имени должна быть больше ${ minLength }`);
        }

        this._setName(name);
    }

    @action
    private _setName(name: string | null) {
        this.name = name;
    }

}

export { UserStore };