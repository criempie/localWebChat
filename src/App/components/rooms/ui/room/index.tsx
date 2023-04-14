import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useStore } from '../../../../model';
import { IRoom } from '../../../../model/room';

type Props = Required<Pick<IRoom, 'id' | 'name'>>;

function Room(props: Props) {
    const { rooms } = useStore();

    const className = useMemo(() => {
        let temp = 'select-room__room';
        if (props.id === rooms.currentRoom?.id) temp += ' select-room__room_active';

        return temp;

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