import { IMessage } from '../message';
import { dbBaseName } from './index';

import Dexie, { Table } from 'dexie';

class MessagesDatabase extends Dexie {
    messages!: Table<IMessage>;

    constructor() {
        super(`${ dbBaseName }_messages`);
        this.version(1).stores({
            messages: '++id, body',
        });
    }
}

export { MessagesDatabase };