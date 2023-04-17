import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';

import './index.css';
import { useStore } from '../../model';
import { GUIError } from '../../model/error';

function LoginPage() {
    const [ error, setError ] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { user } = useStore();

    const submitName = () => {
        try {
            user.setName(inputRef.current?.value);
        } catch (e) {
            if (e instanceof GUIError) {
                setError(e.message);
            }
        }
    }

    return (
        <div className={ 'login-page' }>
            <div className={ 'container login-page__container' }>
                <div className={ 'box login-page__box' }>
                    <div className={ 'title login-page__title' }>
                        Login:
                    </div>

                    <label className={ 'input' }>
                        <span className={ 'input__label' }>Username:</span>
                        <input className={ 'input__field' } ref={ inputRef } />
                    </label>

                    <div className={ 'login-page__description' }>
                        <span className={ 'error login-page__error' }>{ error }</span>
                        <button className={ 'button' } onClick={ submitName }>login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(LoginPage);