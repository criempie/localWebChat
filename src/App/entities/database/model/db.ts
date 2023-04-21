import Dexie, { Table } from 'dexie';

import { DB_BASE_NAME } from '../config';
import { IMessage } from '~/App/entities/message';
import { IRoom } from '~/App/entities/room';

class Database extends Dexie {
    messages!: Table<IMessage, number>;
    rooms!: Table<IRoom, number>;

    constructor() {
        super(`${ DB_BASE_NAME }_messages`);
        this.version(1).stores({
            messages: '&++id, body, *roomId, user, timestamp',
            rooms: '&++id, name'
        });
    }
}

export { Database };