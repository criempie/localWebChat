import { createContext, useContext } from 'react';

import { RootStore } from '~/App/model';
import { IAppContext } from './types';

const context = createContext<any>({
    rootStore: new RootStore(),
});

const useAppContext = () => useContext<IAppContext>(context);
const useStore = () => useAppContext().rootStore;

export { useAppContext, useStore };