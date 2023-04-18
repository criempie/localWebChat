import { liveQuery, Subscription } from 'dexie';
import { action, makeObservable, observable, reaction } from 'mobx';

import { messagesDB } from '../database';
import { IMessage } from '../message';
import RootStore from './index';

class MessagesStore {
    @observable public messages: IMessage[] = [];

    private _messagesSubscription?: Subscription;

    constructor(private _root: RootStore) {
        makeObservable(this);
    }

    public init() {
        reaction(
            () => this._root.rooms.currentRoom,
            this._onChangeRoom.bind(this)
        )
    }

    public async createMessage(message: Pick<IMessage, 'body'>) {
        if (!this._root.rooms.currentRoom) return;
        if (!this._root.user.name) return;

        return await messagesDB.messages.add(
            {
                ...message,
                roomId: this._root.rooms.currentRoom.id,
                user: { name: this._root.user.name },
                timestamp: Date.now(),
            }
        );
    }

    @action
    private _setMessages(messages: IMessage[]) {
        this.messages = messages;
    }

    private _subscribeToDBChanges() {
        const messagesObserver = liveQuery(() => {
            return messagesDB.messages
                             .where({ roomId: this._root.rooms.currentRoom?.id })
                             .toArray()
        })

        this._messagesSubscription = messagesObserver.subscribe({
            next: this._setMessages.bind(this),
        })
    }

    private _onChangeRoom() {
        this._messagesSubscription?.unsubscribe();

        this._subscribeToDBChanges();
    }
}

export { MessagesStore };