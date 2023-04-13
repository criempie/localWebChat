import './index.css';
import InputName from './ui/input-name';
import CreateRoom from './ui/create-room';
import List from './ui/list';

function Rooms() {
    return (
        <div className={ 'select-room' }>
            <InputName />
            <hr />
            <CreateRoom />
            <hr />
            <List />
        </div>
    )
}

export default Rooms;