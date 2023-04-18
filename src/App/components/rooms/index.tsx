import { observer } from 'mobx-react-lite';

import './index.css';
import { useStore } from '../../model';
import List from './ui/list';
import RoomCreate from './ui/room-create';

function Rooms() {
    const { user } = useStore();

    const logout = () => {
        user.logout();
    }

    return (
        <div className={ 'rooms' }>
            <div className={ 'username rooms__username' }>
                <span className={ 'username__name' }>
                    { user.name }
                </span>
                <button className={ 'button username__button' } onClick={ logout }>
                    logout
                </button>
            </div>

            <RoomCreate />

            <List />
        </div>
    )
}

export default observer(Rooms);