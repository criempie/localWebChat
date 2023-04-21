import { observer } from 'mobx-react-lite';

import './index.css';
import RoomPlug from './ui/room-plug';
import { useStore } from '~/App/model';
import Messages from '~/App/components/messages';
import Rooms from '~/App/components/rooms';

function MainPage() {
    const { rooms } = useStore();

    return (
        <div className={ 'home-page' }>
            <Rooms />
            {
                rooms.currentRoom
                    ? <Messages />
                    : <RoomPlug />
            }
        </div>
    );
}

export default observer(MainPage);