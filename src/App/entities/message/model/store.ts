import { liveQuery, Subscription } from 'dexie';
import { action, makeObservable, observable, reaction } from 'mobx';

import db from '~/App/entities/database';
import { IFile } from '~/App/entities/files/model/types';
import { IMessage } from '~/App/entities/message';
import { IRoom } from '~/App/entities/room';
import { RootStore } from '~/App/model';

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
        );
    }

    public async createMessage(message: Pick<IMessage, 'body'>, attachments?: NonNullable<IFile['id']>[]) {
        if (!this._root.rooms.currentRoom) return;
        if (!this._root.user.name) return;

        return db.messages.add(
            {
                ...message,
                roomId: this._root.rooms.currentRoom.id,
                user: { name: this._root.user.name },
                timestamp: Date.now(),
                attachments,
            }
        );
    }

    public async getMessagesFromRoom(roomId: Required<IRoom>['id']) {
        return db.messages.where({ roomId }).toArray();
    }

    public async deleteMultipleMessages(ids: Required<IMessage>['id'][]) {
        return db.messages.bulkDelete(ids);
    }

    public async deleteMessage(messageId: Required<IMessage>['id']) {
        return db.messages.delete(messageId);
    }

    @action
    private _setMessages(messages: IMessage[]) {
        this.messages = messages;
    }

    private _subscribeToDBChanges() {
        const messagesObserver = liveQuery(() => {
            if (this._root.rooms.currentRoom) {
                return this.getMessagesFromRoom(this._root.rooms.currentRoom?.id);
            } else return [];
        });

        this._messagesSubscription = messagesObserver.subscribe({
            next: this._setMessages.bind(this),
        });
    }

    private _onChangeRoom() {
        this._messagesSubscription?.unsubscribe();

        this._subscribeToDBChanges();
    }
}

export { MessagesStore };