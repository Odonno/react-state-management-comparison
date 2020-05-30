import React, { createContext, ReactNode, useContext } from "react";
import { Store } from './Models';

const StoreContext = createContext<Store>({} as Store);

type StoreContextProviderProps = {
    children?: ReactNode;
};

export const StoreProvider = ({ children }: StoreContextProviderProps) => {
    const store = new Store();

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);