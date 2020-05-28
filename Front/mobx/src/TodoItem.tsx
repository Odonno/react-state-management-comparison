import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import { Input } from '@material-ui/core';
import { Todo } from './Models';
import { useStore } from './StoreContext';
import { useObserver } from 'mobx-react-lite';

type Props = {
    todo: Todo;
};

const TodoItem = (props: Props) => {
    const {
        todo
    } = props;

    const todoList = useStore();

    const handleTodoChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputTarget = e.target as HTMLInputElement;

        if (inputTarget) {
            todo.content = inputTarget.value;
        }
    }
    
    const handleTodoBlur = () => {
        todoList.updateTodo(todo.id, todo.content);
    }

    const handleRemoveTodoButtonClicked = (id: number) => {
        todoList.delete(id);
    }

    return useObserver(() =>
        <div>
            <Input
                style={{ width: 350 }}
                defaultValue={todo.content}
                inputProps={{ 'aria-label': 'description' }}
                onChange={e => handleTodoChanged(e)}
                onBlur={() => handleTodoBlur()}
            />
            <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => handleRemoveTodoButtonClicked(todo.id)}
            >
                <DeleteOutlinedIcon />
            </IconButton>
        </div>
    );
}

export default TodoItem;