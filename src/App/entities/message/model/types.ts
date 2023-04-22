import { IFile } from '~/App/entities/files/model/types';
import { IRoom } from '~/App/entities/room';
import { IUser } from '~/App/entities/user';

export interface IMessage {
    id?: number;
    body: string;
    user: IUser;
    timestamp: number;
    roomId: IRoom['id'];
    attachments?: NonNullable<IFile['id']>[];
}