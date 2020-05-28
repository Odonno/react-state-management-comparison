import React, { Dispatch, SetStateAction } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import { Input } from '@material-ui/core';
import { Todo } from './Models';
import { apiUrl } from './constants';

type Props = {
    todo: Todo;
    setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const TodoItem = (props: Props) => {
    const {
        todo,
        setTodos
    } = props;

    const handleTodoBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
        const inputTarget = e.target as HTMLInputElement;

        if (inputTarget) {
            const value = inputTarget.value;

            const payload = {
                id,
                content: value
            };

            fetch(`${apiUrl}/todos`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(todo => {
                    setTodos(todos => {
                        return todos.map(t => {
                            if (t.id === todo.id) {
                                return todo;
                            }
                            return t;
                        });
                    });
                });
        }
    }

    const handleRemoveTodoButtonClicked = (id: number) => {
        fetch(`${apiUrl}/todos/${id}`, {
            method: 'DELETE'
        })
            .then(_ => {
                setTodos(todos => {
                    return todos.filter(t => t.id !== id);
                });
            });
    }

    return (
        <div>
            <Input
                style={{ width: 350 }}
                defaultValue={todo.content}
                inputProps={{ 'aria-label': 'description' }}
                onBlur={e => handleTodoBlur(e, todo.id)}
            />
            <IconButton
                aria-label="delete"
                color="secondary"
                onClick={_ => handleRemoveTodoButtonClicked(todo.id)}
            >
                <DeleteOutlinedIcon />
            </IconButton>
        </div>
    );
}

export default TodoItem;