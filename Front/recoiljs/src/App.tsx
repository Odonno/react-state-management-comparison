import React, { useEffect } from 'react';
import './App.css';
import Logo from './Logo';
import NewTodo from './NewTodo';
import TodosView from './TodosView';
import { useLoadTodos } from './hooks';

const App = () => {  
  const loadTodos = useLoadTodos();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <div className="app">
      <header className="header">
        <Logo />

        <TodosView />

        <NewTodo />
      </header>
    </div>
  );
}

export default App;
