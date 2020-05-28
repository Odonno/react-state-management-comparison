import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@material-ui/core';
import { apiUrl } from './constants';
import { Todo } from './Models';

type Props = {
    setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const NewTodo = (props: Props) => {
    const {
        setTodos
    } = props;

    const handleNewTodoKeyPressed = (e: React.SyntheticEvent<any, Event>) => {
        const inputTarget = e.target as HTMLInputElement;
        const value = inputTarget.value;
        const eventKey = (e as any).key;

        if (inputTarget && eventKey && eventKey.toLowerCase() === 'enter' && value) {
            const payload = {
                content: value
            };

            fetch(`${apiUrl}/todos`, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(todo => {
                    setTodos(todos => todos.concat(todo));
                    inputTarget.value = '';
                });
        }
    }

    return (
        <TextField
            label="New things to do?"
            onKeyPress={e => handleNewTodoKeyPressed(e)}
            style={{ marginTop: 40, width: 550 }}
            size="small"
            variant="outlined"
        />
    );
}

export default NewTodo;
