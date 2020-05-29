import { useCallback } from "react";
import { apiUrl } from "./constants";
import { Todo } from "./Models";
import { todoListState } from "./Atoms";
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const useTodos = () => useRecoilValue(todoListState);

export const useLoadTodos = () => {
    const setTodos = useSetRecoilState(todoListState);

    return useCallback(
        async () => {
            const response = await fetch(`${apiUrl}/todos`);
            const results = await response.json();
            return setTodos(results);
        },
        [setTodos]
    );
}

export const useCreateTodo = () => {
    const setTodos = useSetRecoilState(todoListState);

    return useCallback(
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
}

export const useChangeContent = () => {
    const setTodos = useSetRecoilState(todoListState);

    return useCallback(
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
}

export const useUpdateTodo = () => {
    const setTodos = useSetRecoilState(todoListState);

    return useCallback(
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
}

export const useDeleteTodo = () => {
    const setTodos = useSetRecoilState(todoListState);

    return useCallback(
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
}