import React, { createContext, ReactNode, useContext, useCallback } from "react";
import { apiUrl } from "./constants";
import { Todo } from "./Models";
import { todoListState } from "./Atoms";
import { useRecoilValue, useSetRecoilState } from 'recoil';

export type StoreContextState = {
    loadTodos: () => Promise<void>;
    createTodo: (content: string) => Promise<void>;
    changeContent: (todo: Todo, content: string) => void;
    updateTodo: (id: number, content: string) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
};

const StoreContext = createContext<StoreContextState>({} as StoreContextState);

type StoreContextProviderProps = {
    children?: ReactNode;
};

export const StoreProvider = ({ children }: StoreContextProviderProps) => {
    const setTodos = useSetRecoilState(todoListState);

    const loadTodos = useCallback(
        async () => {
            const response = await fetch(`${apiUrl}/todos`);
            const results = await response.json();
            return setTodos(results);
        },
        [setTodos]
    );

    const createTodo = useCallback(
        async (content: string) => {
            const payload = {
                content
            };

            const response = await fetch(`${apiUrl}/todos`, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            const todo = await response.json();
            setTodos(todos => todos.concat(todo));
        },
        [setTodos]
    );

    const changeContent = useCallback(
        (todo: Todo, content: string) => {
            setTodos(todos => {
                return todos.map(t => {
                    if (t.id === todo.id) {
                        return {
                            ...todo,
                            content
                        };
                    }
                    return t;
                });
            });
        },
        [setTodos]
    );

    const updateTodo = useCallback(
        async (id: number, content: string) => {
            const payload = {
                id,
                content
            };

            const response = await fetch(`${apiUrl}/todos`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
            const todo = await response.json();
            setTodos(todos => {
                return todos.map(t => {
                    if (t.id === todo.id) {
                        return todo;
                    }
                    return t;
                });
            });
        },
        [setTodos]
    );

    const deleteTodo = useCallback(
        async (id: number) => {
            await fetch(`${apiUrl}/todos/${id}`, {
                method: 'DELETE'
            });
            setTodos(todos => {
                return todos.filter(t => t.id !== id);
            });
        },
        [setTodos]
    );

    const state = {
        loadTodos,
        createTodo,
        changeContent,
        updateTodo,
        deleteTodo
    };

    return (
        <StoreContext.Provider value={state}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);

export const useTodos = (): Todo[] => useRecoilValue(todoListState);