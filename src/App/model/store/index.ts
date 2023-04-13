import { MessagesStore } from './messages';
import { RoomsStore } from './rooms';

class RootStore {
    public messages: MessagesStore;
    public rooms: RoomsStore

    constructor() {
        this.messages = new MessagesStore(this);
        this.rooms = new RoomsStore(this);

        this.messages.init();
        this.rooms.init();
    }
}

export default RootStore