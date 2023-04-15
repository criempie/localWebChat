import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import './index.css';
import { useStore } from '../../../../model';
import Step_1 from './step_1';
import Step_2 from './step_2';

function InputName() {
    return (
        <div>
            { renderSteps() }
        </div>
    )
}

function renderSteps() {
    const { rooms } = useStore();

    if (rooms.userName) {
        return <Step_1 userName={ rooms.userName } />;
    } else {
        return <Step_2 />
    }
}

export default observer(InputName);