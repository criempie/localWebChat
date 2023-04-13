import { observer } from 'mobx-react-lite';

import { useStore } from '../../../../model';
import Room from '../room';

function RoomsList() {
    return (
        <div className={ 'select-room__list' }>
            { renderRooms() }
        </div>
    )
}

function renderRooms() {
    const { rooms } = useStore();

    return rooms.rooms.map((room) => <Room { ...room } key={ room.id } />)
}

export default observer(RoomsList);