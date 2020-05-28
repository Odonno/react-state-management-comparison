import React, { createContext, ReactNode, useContext } from "react";
import { TodoList } from './Models';

const StoreContext = createContext<TodoList>({} as TodoList);

type StoreContextProviderProps = {
    children?: ReactNode;
};

export const StoreProvider = ({ children }: StoreContextProviderProps) => {
    const todoList = new TodoList();

    return (
        <StoreContext.Provider value={todoList}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);