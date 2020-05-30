import React from 'react';
import './App.css';
import Logo from './Logo';
import TodosView from './TodosView';
import NewTodo from './NewTodo';
import { StoreProvider } from './StoreContext';

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <Logo />

        <StoreProvider>
          <TodosView />

          <NewTodo />
        </StoreProvider>
      </header>
    </div>
  );
}

export default App;
