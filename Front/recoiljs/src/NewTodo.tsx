import React from 'react';
import { TextField } from '@material-ui/core';
import { useCreateTodo } from './hooks';

type Props = {
};

const NewTodo = (props: Props) => {
    const createTodo = useCreateTodo();

    const handleNewTodoKeyPressed = (e: React.SyntheticEvent<any, Event>) => {
        const inputTarget = e.target as HTMLInputElement;
        const value = inputTarget.value;
        const eventKey = (e as any).key;

        if (inputTarget && eventKey && eventKey.toLowerCase() === 'enter' && value) {
            createTodo(value)
                .finally(() => {
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
