import { IRoom } from '../room';

export interface IMessage {
    id?: number;
    body: string;
    roomId: IRoom['id'];
}