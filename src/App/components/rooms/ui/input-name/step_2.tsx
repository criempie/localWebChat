import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useStore } from '../../../../model';

interface Props {

}

function Step_2(props: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const { rooms } = useStore();

    const saveName = () => {
        if (inputRef.current?.value) {
            rooms.setName(inputRef.current?.value);
        }
    }

    return (
        <>
            <label>
                <input ref={ inputRef } placeholder={ 'Введите имя...' } />
            </label>
            <button onClick={ saveName }>Сохранить</button>
        </>
    )
}

export default observer(Step_2);