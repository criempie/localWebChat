import { observer } from 'mobx-react-lite';

import './index.css';
import Icon from '~/App/ui/icon';
import IconButton from '~/App/ui/icon-button';

function FileInput() {


    return (
        <label className={ 'file-input' }>
            <IconButton>
                <Icon.Upload className={ 'file-input__icon' } width={ 32 } height={ 32 } />
            </IconButton>

            <input className={ 'hidden' } type={ 'file' } />
        </label>
    );
}

export default observer(FileInput);