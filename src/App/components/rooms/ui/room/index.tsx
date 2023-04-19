import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import './index.css';
import * as Icon from '../../../icon';
import { useStore } from '../../../../model';
import { IRoom } from '../../../../model/room';

type Props = Required<Pick<IRoom, 'id' | 'name'>>;

function Room(props: Props) {
    if (!props.id) return <></>

    const { rooms } = useStore();

    const className_room__name = useMemo(() => {
        let defaultClass = 'room__name';
        if (props.id === rooms.currentRoom?.id) defaultClass += ' room__name_active';

        return defaultClass;

    }, [ props.id, rooms.currentRoom ])

    const clickHandler = () => {
        rooms.selectRoom(props.id);
    }

    const deleteRoom = () => {
        rooms.deleteRoom(props.id);
    }

    return (
        <div className={ 'room' }>
            <div onClick={ clickHandler } className={ className_room__name }>{ props.name }</div>
            <div onClick={ deleteRoom } className={ 'room__button' }>
                <Icon.Cross width={ 24 } height={ 24 } />
            </div>
        </div>
    )
}

export default observer(Room);