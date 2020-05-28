import React from 'react';
import './App.css';
import Logo from './Logo';
import NewTodo from './NewTodo';
import TodosView from './TodosView';

const App = () => {
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
