import Icon from '~/App/ui/icon';
import { FileWithID } from '../../model';
import './index.css';

type Props = Pick<FileWithID, 'name'> & { src: string, onClick?: () => void; };

function UploadedImagePreview(props: Props) {
    return (
        <div className={ 'image-preview' } onClick={ props.onClick }>
            <Icon.Cross className={ 'image-preview__cross' } width={ 24 } height={ 24 } />
            <img src={ props.src } className={ 'image-preview__image' } />
            <div className={ 'image-preview__name' }>{ props.name }</div>
        </div>
    );
}

export default UploadedImagePreview;