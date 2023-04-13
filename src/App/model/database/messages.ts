import Dexie, { Table } from 'dexie';

import { IMessage } from '../message';
import { IRoom } from '../room';
import { dbBaseName } from './index';

class MessagesDatabase extends Dexie {
    messages!: Table<IMessage, number>;
    rooms!: Table<IRoom, number>;

    constructor() {
        super(`${ dbBaseName }_messages`);
        this.version(1).stores({
            messages: '&++id, body, *roomId',
            rooms: '&++id, name'
        });
    }
}

export { MessagesDatabase };