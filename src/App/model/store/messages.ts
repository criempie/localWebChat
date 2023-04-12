import { liveQuery, Observable, Subscription } from 'dexie';
import { action, makeObservable, observable } from 'mobx';
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
        messagesDB.messages.toArray().then(this._setMessages.bind(this));

        const messagesObserver = liveQuery(() => messagesDB.messages.toArray());

        this._messagesSubscription = messagesObserver.subscribe({
            next: this._setMessages.bind(this),
        })
    }

    public addMessage(message: Omit<IMessage, 'id'>) {
        messagesDB.messages.add(message);
    }

    @action
    private _setMessages(messages: IMessage[]) {
        this.messages = messages;
    }
}

export { MessagesStore };