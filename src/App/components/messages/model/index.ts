import { rootStoreInstance } from '~/App/model';
import { LocalStorage } from './store';

const localStorage = new LocalStorage(rootStoreInstance);

export { localStorage };
export type { IFileListFunctions, FileWithID } from './types';