import { action, makeObservable, observable } from 'mobx';
import { IMessage } from '~/App/entities/message';
import { RootStore } from '~/App/model';

class LocalStorage {
    @observable attachedMessage: IMessage | null = null;

    constructor(private _root: RootStore) {
        makeObservable(this);
    }

    @action
    public attachMessage(id: NonNullable<IMessage['id']>) {
        this._root.messages.getMessage(id)
            .then((msg) => {
                if (msg) {
                    this.attachedMessage = msg;
                }
            });
    }

    @action
    public detachMessage() {
        this.attachedMessage = null;
    }
}

export { LocalStorage };