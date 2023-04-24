import { liveQuery, Subscription } from 'dexie';
import { action, makeObservable, observable, reaction } from 'mobx';

import db from '~/App/entities/database';
import { IFile } from '~/App/entities/files/model/types';
import { IAttachment, IMessage } from '~/App/entities/message';
import { filterImageAttachments } from '~/App/entities/message/lib';
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

    public async createMessage(message: Pick<IMessage, 'body'>, attachments?: IAttachment[]) {
        if (!this._root.rooms.currentRoom) return;
        if (!this._root.user.name) return;

        return db.messages.add(
            {
                ...message,
                roomId: this._root.rooms.currentRoom.id,
                user: { name: this._root.user.name },
                timestamp: Date.now(),
                attachments: attachments ?? [],
            }
        );
    }

    public async getMessage(id: NonNullable<IMessage['id']>) {
        return db.messages.get(id);
    }

    public async getMessagesFromRoom(roomId: Required<IRoom>['id']) {
        return db.messages.where({ roomId }).toArray();
    }

    public async deleteMultipleMessages(ids: Required<IMessage>['id'][]) {
        const messages = await db.messages.bulkGet(ids);
        const attachments = messages.map((msg) => msg?.attachments)
                                    .filter(
                                        (att): att is NonNullable<IMessage['attachments']> => !!att);

        const allAttachments = ([] as IAttachment[]).concat.apply([], attachments);
        const filesAttachments = filterImageAttachments(allAttachments).map((f) => f.fileID);

        if (filesAttachments.length > 0) {
            this._root.files.deleteMultipleFiles(filesAttachments);
        }

        return db.messages.bulkDelete(ids);
    }

    public async deleteMessage(id: Required<IMessage>['id']) {
        const message = await this.getMessage(id);

        if (!message) return;

        const attachments = filterImageAttachments(message.attachments).map((img) => img.fileID);

        await this._root.files.deleteMultipleFiles(attachments);

        return db.messages.delete(id);
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