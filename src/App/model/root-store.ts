import { MessagesStore } from '~/App/entities/message';
import { RoomsStore } from '~/App/entities/room';
import { UserStore } from '~/App/entities/user';

class RootStore {
    public messages: MessagesStore;
    public rooms: RoomsStore;
    public user: UserStore;

    constructor() {
        this.messages = new MessagesStore(this);
        this.rooms = new RoomsStore(this);
        this.user = new UserStore(this);

        this.messages.init();
        this.rooms.init();
        this.user.init();
    }
}

export { RootStore };