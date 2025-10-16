import './App.css';
import {useState} from 'react';

import TodoList from './components/TodoList';
import {OpenSnackProvider} from './components/SnackContext';

export default function App() {
  return (
    <div className="App">
      <OpenSnackProvider>
        <TodoList />
      </OpenSnackProvider>
    </div>
  );
}
