import { observer } from 'mobx-react-lite';

import './index.css';
import { useRef } from 'react';
import { useStore } from '../../../../model';

function RoomCreate() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { rooms } = useStore();

    const clearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const createRoom = () => {
        if (inputRef.current) {
            rooms.createRoom(inputRef.current.value)
                 .then(clearInput);
        }
    }

    return (
        <div className={ 'room-create' }>
            <div className={ 'title room-create__title' }>
                Create room
            </div>

            <div className={ 'input' }>
                <input className={ 'input__field' } ref={ inputRef } />
                <button className={ 'button input__button' } onClick={ createRoom }>
                    Создать
                </button>
            </div>
        </div>
    )
}

export default observer(RoomCreate);