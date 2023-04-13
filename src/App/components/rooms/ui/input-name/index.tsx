import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

function InputName() {
    const nameInputRef = useRef<HTMLInputElement>(null);

    return (
        <label className={ 'select-room__label' }>
            Имя: <input className={ 'select-room__input' } ref={ nameInputRef } />
        </label>
    )
}

export default observer(InputName);