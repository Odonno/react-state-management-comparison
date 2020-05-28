import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import { Todo } from './Models';
import { apiUrl } from './constants';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/todos`)
      .then(response => response.json())
      .then(results => setTodos(results));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <img src={logo} style={{ height: 50, marginBottom: 40 }} alt="logo" />

        {todos.map(todo => <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />)}

        <NewTodo setTodos={setTodos} />
      </header>
    </div>
  );
}

export default App;
