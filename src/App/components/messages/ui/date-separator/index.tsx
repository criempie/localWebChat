import { useMemo } from 'react';

import './index.css';

interface Props {
    timestamp: number;
}

function DateSeparator(props: Props) {
    const dateFormat = useMemo(() => {
        const date = new Date(props.timestamp);

        return date.toLocaleDateString('ru-RU');
    }, [ props.timestamp ])

    return (
        <div className={ 'date-separator' }>
            <span className={'date-separator__text'}>{ dateFormat }</span>
        </div>
    )
}

export default DateSeparator;