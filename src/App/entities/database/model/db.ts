import Dexie, { Table } from 'dexie';
import { IFile } from '~/App/entities/files/model/types';

import { DB_BASE_NAME } from '../config';
import { IMessage } from '~/App/entities/message';
import { IRoom } from '~/App/entities/room';

class Database extends Dexie {
    messages!: Table<IMessage, number>;
    rooms!: Table<IRoom, number>;
    files!: Table<IFile, number>;

    constructor() {
        super(`${ DB_BASE_NAME }_messages`);
        this.version(1).stores({
            messages: '&++id, body, *roomId, user, timestamp, attachments',
            rooms: '&++id, name',
            files: '&++id, file, *messageId'
        });
    }
}

export { Database };