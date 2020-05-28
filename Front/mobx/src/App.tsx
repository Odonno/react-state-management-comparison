import React from 'react';
import './App.css';
import Logo from './Logo';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';
import { useObserver } from 'mobx-react-lite';
import { useStore } from './StoreContext';

const App = () => {
  const todoList = useStore();

  return useObserver(() =>
    <div className="app">
      <header className="header">
        <Logo />

        {todoList.list.map(todo => <TodoItem key={todo.id} todo={todo} />)}

        <NewTodo />
      </header>
    </div>
  );
}

export default App;
