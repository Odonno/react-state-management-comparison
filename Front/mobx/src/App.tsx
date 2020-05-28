import React from 'react';
import './App.css';
import { useObserver } from 'mobx-react-lite';
import Logo from './Logo';
import NewTodo from './NewTodo';
import TodosView from './TodosView';

const App = () => {
  return useObserver(() =>
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
