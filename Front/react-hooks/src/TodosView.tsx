import React, { Dispatch, SetStateAction } from 'react';
import TodoItem from './TodoItem';
import { Todo } from './Models';

type Props = {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const TodosView = (props: Props) => {
    const {
        todos,
        setTodos
    } = props;

    return (
        <>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />)}
        </>
    );
}

export default TodosView;
