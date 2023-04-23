import { IAttachment } from '~/App/entities/message';

export function filterImageAttachments(arr: IAttachment[]): IAttachment<'image'>[] {
    return arr.filter((att) => att.type === 'image') as IAttachment<'image'>[];
}