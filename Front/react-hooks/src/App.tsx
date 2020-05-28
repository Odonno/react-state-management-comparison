import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo } from './Models';
import { apiUrl } from './constants';
import Logo from './Logo';
import TodosView from './TodosView';
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
        <Logo />

        <TodosView todos={todos} setTodos={setTodos} />

        <NewTodo setTodos={setTodos} />
      </header>
    </div>
  );
}

export default App;
