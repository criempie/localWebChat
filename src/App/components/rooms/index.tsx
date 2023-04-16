import { observer } from 'mobx-react-lite';

import './index.css';
import { useStore } from '../../model';
import List from './ui/list';

function Rooms() {
    const { rooms } = useStore();

    return (
        <div className={ 'rooms' }>
            <div className={ 'username rooms__username' }>
                <span className={ 'username__name' }>
                    { 'criempiee' }
                </span>
                <button className={ 'button username__button' }>logout</button>
            </div>

            <List />
        </div>
    )
}

export default observer(Rooms);