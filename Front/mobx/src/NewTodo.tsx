import React from 'react';
import { TextField } from '@material-ui/core';
import { useStore } from './StoreContext';

type Props = {
};

const NewTodo = (props: Props) => {
    const todoList = useStore();

    const handleNewTodoKeyPressed = (e: React.SyntheticEvent<any, Event>) => {
        const inputTarget = e.target as HTMLInputElement;
        const value = inputTarget.value;
        const eventKey = (e as any).key;

        if (inputTarget && eventKey && eventKey.toLowerCase() === 'enter' && value) {
            todoList.create(value)
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
