import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

interface Props {
    className?: string;
}

function Input(props: Props, ref?: ForwardedRef<HTMLInputElement>) {
    return (
        <div className={ clsx('input', props.className) }>
            <input className={ 'input__field' }
                   type={ 'text' }
                   ref={ ref } />
        </div>
    )
}

export default forwardRef(Input);