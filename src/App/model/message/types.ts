import { IRoom } from '../room';
import { IUser } from '../user';

export interface IMessage {
    id?: number;
    body: string;
    roomId: IRoom['id'];
    user: IUser;
    timestamp: number;
}