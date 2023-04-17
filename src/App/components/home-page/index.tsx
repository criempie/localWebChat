import './index.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../model';
import Messages from '../messages';
import Rooms from '../rooms';
import RoomPlug from './ui/room-plug';

function HomePage() {
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
    )
}

export default observer(HomePage);