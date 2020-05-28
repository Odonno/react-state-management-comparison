import React, { Dispatch, SetStateAction } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import { Input } from '@material-ui/core';
import { Todo } from './Models';
import { todoListState } from './Atoms';
import { apiUrl } from './constants';
const { useSetRecoilState } = require('recoil');

type Props = {
    todo: Todo;
};

const TodoItem = (props: Props) => {
    const {
        todo
    } = props;

    const setTodos: Dispatch<SetStateAction<Todo[]>> = useSetRecoilState(todoListState);

    const handleTodoChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputTarget = e.target as HTMLInputElement;

        if (inputTarget) {
            setTodos(todos => {
                return todos.map(t => {
                    if (t.id === todo.id) {
                        return {
                            ...todo,
                            content: inputTarget.value
                        };
                    }
                    return t;
                });
            });
        }
    }

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