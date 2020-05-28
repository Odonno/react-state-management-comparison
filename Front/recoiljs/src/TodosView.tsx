import React from 'react';
import TodoItem from './TodoItem';
import { useTodos } from './StoreContext';

const TodosView = () => {
    const todos = useTodos();

    return (
        <>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </>
    );
}

export default TodosView;
