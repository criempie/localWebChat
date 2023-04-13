import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useStore } from '../../../../model';

function CreateRoom() {
    const { rooms } = useStore();
    const roomInputRef = useRef<HTMLInputElement>(null);

    const createRoom = () => {
        if (roomInputRef.current) {
            rooms.createRoom(roomInputRef.current.value);
        }
    }

    return (
        <>
            <label className={ 'select-room__label' }>
                Название комнаты: <input className={ 'select-room__input' } ref={ roomInputRef } />
            </label>
            <button onClick={ createRoom } className={ 'select-room__button' }>Создать</button>
        </>
    )
}

export default observer(CreateRoom);