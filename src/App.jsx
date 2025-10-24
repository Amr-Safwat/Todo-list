import './App.css';
import TodoList from './components/TodoList';
import {TodoProvider} from './components/contexts/todosContext';

export default function App() {
  return (
    <div className="App">
      <TodoProvider>
          <TodoList />
      </TodoProvider>
    </div>
  );
}
