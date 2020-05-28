import React, { useEffect } from 'react';
import './App.css';
import Logo from './Logo';
import { useStore } from './StoreContext';
import TodosView from './TodosView';
import NewTodo from './NewTodo';

const App = () => {
  const { loadTodos } = useStore();

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
