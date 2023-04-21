import './index.css';
import { ReactNode } from 'react';

interface Props {
    className?: string;
}

function Button(props: Props, children?: ReactNode) {
    return (
        <button className={ 'button' }>{ children }</button>
    )
}

export default Button;