import { IAttachment } from '~/App/entities/message';

export function filterMessageAttachments(arr: IAttachment[]): IAttachment<'message'> | undefined {
    return arr.find((att) => att.type === 'message') as IAttachment<'message'> | undefined;
}