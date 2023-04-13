import { liveQuery, Subscription } from 'dexie';
import { action, makeObservable, observable } from 'mobx';

import { messagesDB } from '../database';
import { IRoom } from '../room';
import RootStore from './index';

class RoomsStore {
    @observable userName: string = '';
    @observable currentRoom: Required<IRoom> | null = null;
    @observable rooms: Required<IRoom>[] = [];

    private _roomsSubscription?: Subscription;

    constructor(private _root: RootStore) {
        makeObservable(this);
    }

    public async selectRoom(roomId: Required<IRoom>['id']) {
        await this._setCurrentRoom(roomId);
    }

    public createRoom(name: string) {
        messagesDB.rooms
                  .add({ name })
                  .then((id) => {
                      this._setCurrentRoom(Number(id));
                  });
    }

    public init() {
        messagesDB.rooms.toArray().then((rooms) => {
            this._setRooms(this._convertType(rooms));
        });

        const roomsObserver = liveQuery(() => messagesDB.rooms.toArray());
        this._roomsSubscription = roomsObserver.subscribe({
            next: (rooms) => this._setRooms(this._convertType(rooms))
        })
    }

    @action
    private _setRooms(rooms: Required<IRoom>[]) {
        this.rooms = rooms;
    }

    @action
    private async _setCurrentRoom(roomId: Required<IRoom>['id']) {
        const room = await this._getRoomFromDB(roomId);

        if (room) this.currentRoom = room
    }

    private async _getRoomFromDB(id: Required<IRoom>['id']) {
        const room = await messagesDB.rooms.get(id) as Required<IRoom>;
        return room;
    }

    /**
     * Эта функция нужна, чтобы сделать поле id обязательным.
     *
     * Дело в том, что при указании типа в Dexie.Table,
     * необходимо указать параметр id как необязательный,
     * иначе он будет требоваться при добавлении новых значений в базу,
     * но так быть не должно, поскольку он будет присваивать id автоматически.
     *
     * При получении значений из базы данных, очевидно,
     * поле id должно обязательно присутствовать, но в Dexie это не учтено
     * и возвращается тот самый тип, у которого поле id необязательно.
     */
    private _convertType(rooms: IRoom[]) {
        return rooms as Required<IRoom>[];
    }
}

export { RoomsStore };