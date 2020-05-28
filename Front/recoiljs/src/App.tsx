import React, { useEffect } from 'react';
import './App.css';
import Logo from './Logo';
import NewTodo from './NewTodo';
import TodosView from './TodosView';
import { useStore } from './StoreContext';

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
