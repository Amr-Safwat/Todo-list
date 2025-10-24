import tasksReducer from '../reducers/TasksReducer';
import {createContext, useContext, useReducer} from 'react';
import {OpenSnackProvider} from '../contexts/SnackContext';

const TodoContext = createContext([]);

const TodoProvider = ({children}) => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  return (
    <TodoContext.Provider value={{ tasks, dispatch}}>
      <OpenSnackProvider>{children}</OpenSnackProvider>
    </TodoContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TodoContext);
};

export default TodoProvider;


