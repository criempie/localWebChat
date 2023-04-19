import { liveQuery, Subscription } from 'dexie';
import { action, makeObservable, observable, reaction } from 'mobx';

import { messagesDB } from '../database';
import { IMessage } from '../message';
import { IRoom } from '../room';
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

        return messagesDB.messages.add(
            {
                ...message,
                roomId: this._root.rooms.currentRoom.id,
                user: { name: this._root.user.name },
                timestamp: Date.now(),
            }
        );
    }

    public async getMessagesFromRoom(roomId: Required<IRoom>['id']) {
        return messagesDB.messages.where({ roomId }).toArray();
    }

    public async deleteMultipleMessages(ids: Required<IMessage>['id'][]) {
        return messagesDB.messages.bulkDelete(ids);
    }

    public async deleteMessage(messageId: Required<IMessage>['id']) {
        return messagesDB.messages.delete(messageId);
    }

    @action
    private _setMessages(messages: IMessage[]) {
        this.messages = messages;
    }

    private _subscribeToDBChanges() {
        const messagesObserver = liveQuery(() => {
            if (this._root.rooms.currentRoom) {
                return this.getMessagesFromRoom(this._root.rooms.currentRoom?.id)
            } else return [];
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