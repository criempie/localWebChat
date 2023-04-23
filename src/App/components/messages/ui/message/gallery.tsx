import { IFile } from '~/App/entities/files';
import ImageGallery from '~/App/ui/image-gallery';

interface Props {
    attachments: IFile[];
}

function Gallery({ attachments }: Props) {
    return (
        <div className={ 'message__image-gallery' }>
            {
                attachments.length > 0 ?
                    <ImageGallery images={ attachments } /> :
                    null
            }
        </div>
    );
}

export { Gallery };