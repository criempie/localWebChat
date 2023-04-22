import './index.css';
import { IFile } from '~/App/entities/files';

interface Props {
    images: IFile[];
}

function ImageGallery(props: Props) {
    return (
        <div className={ 'image-gallery' }>
            { renderImages(props.images) }
        </div>
    );
}

function renderImages(images: IFile[]) {
    return images.map((img) => {
        const src = URL.createObjectURL(img.file);

        return (
            <div className={ 'image-gallery__item' } key={ img.id }>
                <img src={ src } className={ 'image-gallery__image' } />
            </div>
        );
    });
}

export default ImageGallery;