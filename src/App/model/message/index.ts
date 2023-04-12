function sendMessage(body: string) {
    console.log('send message', body);
}

export type { IMessage } from './types';
export { sendMessage };