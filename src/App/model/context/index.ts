import { IAppContext } from './types';

import { createContext, useContext } from 'react';

const context = createContext<IAppContext>({});

const useAppContext = useContext(context);

export { useAppContext };