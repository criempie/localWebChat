import { FileStore } from '~/App/entities/files';
import { MessagesStore } from '~/App/entities/message';
import { RoomsStore } from '~/App/entities/room';
import { UserStore } from '~/App/entities/user';

class RootStore {
    public messages: MessagesStore;
    public rooms: RoomsStore;
    public user: UserStore;
    public files: FileStore;

    constructor() {
        this.messages = new MessagesStore(this);
        this.rooms = new RoomsStore(this);
        this.user = new UserStore(this);
        this.files = new FileStore(this);

        this.messages.init();
        this.rooms.init();
        this.user.init();
        this.files.init();
    }
}

export { RootStore };