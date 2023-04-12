import { MessagesStore } from './messages';

class RootStore {
    public messages: MessagesStore;

    constructor() {
        this.messages = new MessagesStore(this);

        this.messages.init();
    }
}

export default RootStore