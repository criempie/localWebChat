import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import './index.css';
import { useStore } from '../../../../model';
import { IRoom } from '../../../../model/room';

type Props = Required<Pick<IRoom, 'id' | 'name'>>;

function Room(props: Props) {
    const { rooms } = useStore();

    const className = useMemo(() => {
        let defaultClass = 'rooms__room';
        if (props.id === rooms.currentRoom?.id) defaultClass += ' rooms__room_active';

        return defaultClass;

    }, [ props.id, rooms.currentRoom ])

    const clickHandler = () => {
        rooms.selectRoom(props.id);
    }

    return (
        <div onClick={ clickHandler } className={ className }>
            { props.name }
        </div>
    )
}

export default observer(Room);