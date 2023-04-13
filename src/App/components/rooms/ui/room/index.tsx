import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../model';
import { IRoom } from '../../../../model/room';

type Props = Required<Pick<IRoom, 'id' | 'name'>>;

function Room(props: Props) {
    const { rooms } = useStore();

    const clickHandler = () => {
        rooms.selectRoom(props.id);
    }

    return (
        <div onClick={ clickHandler } className={ 'select-room__room' }>
            { props.name }
        </div>
    )
}

export default observer(Room);