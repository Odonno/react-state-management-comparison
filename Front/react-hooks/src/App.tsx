import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import { Input, TextField } from '@material-ui/core';

type Todo = {
  id: number;
  content: string;
};

const apiUrl = 'http://localhost:7071/api';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/todos`)
      .then(response => response.json())
      .then(results => setTodos(results));
  }, []);

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
          const newTodos = todos.concat(todo);
          setTodos(newTodos);
          inputTarget.value = '';
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
          const newTodos = todos.map(t => {
            if (t.id === todo.id) {
              return todo;
            }
            return t;
          });

          setTodos(newTodos);
        });
    }
  }

  const handleRemoveTodoButtonClicked = (id: number) => {
    fetch(`${apiUrl}/todos/${id}`, {
      method: 'DELETE'
    })
      .then(_ => {
        const newTodos = todos.filter(t => t.id !== id);
        setTodos(newTodos);
      });
  }

  return (
    <div className="app">
      <header className="header">
        <img src={logo} style={{ height: 50, marginBottom: 40 }} alt="logo" />

        {todos.map(todo => {
          return (
            <div key={todo.id}>
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
        })}

        <TextField
          label="New things to do?"
          onKeyPress={e => handleNewTodoKeyPressed(e)}
          style={{ marginTop: 40, width: 550 }}
          size="small"
          variant="outlined"
        />
      </header>
    </div>
  );
}

export default App;
