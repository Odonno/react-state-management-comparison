import React from 'react';
import TodoItem from './TodoItem';
import { useObserver } from 'mobx-react-lite';
import { useStore } from './StoreContext';

const TodosView = () => {
    const store = useStore();

    return useObserver(() => 
        <>
            {store.list.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </>
    );
}

export default TodosView;
