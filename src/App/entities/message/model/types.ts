import { IRoom } from '~/App/entities/room';
import { IUser } from '~/App/entities/user';

export interface IMessage {
    id?: number;
    body: string;
    roomId: IRoom['id'];
    user: IUser;
    timestamp: number;
}