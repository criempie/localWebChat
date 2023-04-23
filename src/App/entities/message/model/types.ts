import { IFile } from '~/App/entities/files/model/types';
import { IRoom } from '~/App/entities/room';
import { IUser } from '~/App/entities/user';

export interface IMessage {
    id?: number;
    body: string;
    user: IUser;
    timestamp: number;
    roomId: IRoom['id'];
    attachments: IAttachment[];
}

export type AttachmentType = 'image' | 'message';

export type IAttachment<T extends AttachmentType = AttachmentType> =
    T extends 'image' ? {
        type: T;
        fileID: NonNullable<IFile['id']>;
    } : T extends 'message' ? {
        type: T;
        messageID: NonNullable<IMessage['id']>;
    } : never;

export type IAttachmentLoaded<T extends AttachmentType = AttachmentType> =
    T extends 'image' ? {
        type: T;
        file: IFile;
    } : T extends 'message' ? {
        type: T;
        message: IMessage;
    } : never;