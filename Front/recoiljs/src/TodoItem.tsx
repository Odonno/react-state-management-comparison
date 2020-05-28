import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import { Input } from '@material-ui/core';
import { Todo } from './Models';
import { useStore } from './StoreContext';

type Props = {
    todo: Todo;
};

const TodoItem = (props: Props) => {
    const {
        todo
    } = props;

    const {
        changeContent,
        updateTodo,
        deleteTodo
    } = useStore();
    
    const handleTodoChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputTarget = e.target as HTMLInputElement;

        if (inputTarget) {
            changeContent(todo, inputTarget.value);
        }
    }

    const handleTodoBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
        const inputTarget = e.target as HTMLInputElement;

        if (inputTarget) {
            const value = inputTarget.value;
            updateTodo(id, value);
        }
    }

    const handleRemoveTodoButtonClicked = (id: number) => {
        deleteTodo(id);
    }

    return (
        <div>
            <Input
                style={{ width: 350 }}
                defaultValue={todo.content}
                inputProps={{ 'aria-label': 'description' }}
                onChange={e => handleTodoChanged(e)}
                onBlur={e => handleTodoBlur(e, todo.id)}
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