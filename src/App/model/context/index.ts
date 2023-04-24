import { createContext, useContext } from 'react';

import { rootStoreInstance } from '../root-store';
import { IAppContext } from './types';

const context = createContext<any>({
    rootStore: rootStoreInstance,
});

const useAppContext = () => useContext<IAppContext>(context);
const useStore = () => useAppContext().rootStore;

export { useAppContext, useStore };