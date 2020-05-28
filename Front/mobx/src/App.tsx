import React from 'react';
import logo from './logo.png';
import './App.css';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';
import { useObserver } from 'mobx-react-lite';
import { useStore } from './StoreContext';

const App = () => {
  const todoList = useStore();

  return useObserver(() =>
    <div className="app">
      <header className="header">
        <img src={logo} style={{ height: 50, marginBottom: 40 }} alt="logo" />

        {todoList.list.map(todo => <TodoItem key={todo.id} todo={todo} />)}

        <NewTodo />
      </header>
    </div>
  );
}

export default App;
