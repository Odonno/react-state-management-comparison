import { apiUrl } from "./constants";
import { Todo } from "./Models";
import { todoListState } from './Atoms';
import { useRecoilValue, useRecoilCallback } from 'recoil';

export const useTodos = () => useRecoilValue(todoListState);

export const useLoadTodos = () =>
    useRecoilCallback(
        async ({ set }) => {
            const response = await fetch(`${apiUrl}/todos`);
            const results = await response.json();
            return set(todoListState, results);
        },
        []
    );

export const useCreateTodo = () =>
    useRecoilCallback(
        async ({ set }, content: string) => {
            const payload = {
                content
            };

            const response = await fetch(`${apiUrl}/todos`, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            const todo = await response.json();
            set(todoListState, todos => todos.concat(todo));
        },
        []
    );

export const useChangeContent = () =>
    useRecoilCallback(
        ({ set }, todo: Todo, content: string) => {
            set(todoListState, todos => {
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
        []
    );

export const useUpdateTodo = () =>
    useRecoilCallback(
        async ({ set }, id: number, content: string) => {
            const payload = {
                id,
                content
            };

            const response = await fetch(`${apiUrl}/todos`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
            const todo = await response.json();
            set(todoListState, todos => {
                return todos.map(t => {
                    if (t.id === todo.id) {
                        return todo;
                    }
                    return t;
                });
            });
        },
        []
    );

export const useDeleteTodo = () =>
    useRecoilCallback(
        async ({ set }, id: number) => {
            await fetch(`${apiUrl}/todos/${id}`, {
                method: 'DELETE'
            });
            set(todoListState, todos => {
                return todos.filter(t => t.id !== id);
            });
        },
        []
    );