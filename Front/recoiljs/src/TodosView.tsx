import React from 'react';
import TodoItem from './TodoItem';
import { todoListState } from './Atoms';
import { Todo } from './Models';
const { useRecoilValue } = require('recoil');

const TodosView = () => {
    const todos: Todo[] = useRecoilValue(todoListState);

    return (
        <>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </>
    );
}

export default TodosView;
