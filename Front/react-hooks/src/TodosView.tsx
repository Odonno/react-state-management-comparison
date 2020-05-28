import React from 'react';
import TodoItem from './TodoItem';
import { useStore } from './StoreContext';

type Props = {
};

const TodosView = (props: Props) => {
    const { todos } = useStore();

    return (
        <>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </>
    );
}

export default TodosView;
