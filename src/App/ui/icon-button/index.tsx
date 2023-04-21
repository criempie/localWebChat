import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import './index.css';

interface Props {
    className?: string;
    onClick?: () => any;
}

function IconButton(props: PropsWithChildren<Props>) {
    return (
        <div onClick={ props.onClick }
             className={ clsx('icon-button', props.className) }>

            { props.children }
        </div>
    );
}

export default IconButton;