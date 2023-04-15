import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../model';

interface Props {
    userName: string;
}

function Step_1(props: Props) {
    const { rooms } = useStore();

    const clearName = () => {
        rooms.changeName('');
    }

    return (
        <label>
            Имя:
            <button onClick={ clearName }>{ props.userName }</button>
        </label>
    )
}

export default observer(Step_1);