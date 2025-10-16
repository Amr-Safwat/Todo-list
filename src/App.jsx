import './App.css';
import {useState} from 'react';
import MySnackbar from './components/MySnackbar';
import TodoList from './components/TodoList';
import {useContext} from 'react';
import {OpenSnackContext} from './components/OpenSnackContext';

export default function App() {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  function showSnackbar (message) {
    setOpen(true);
    setMessage(message)
  };

  return (
    <div className="App">
      <OpenSnackContext.Provider value={{showSnackbar}}>
        <TodoList />
        <MySnackbar open={open} setOpen={setOpen} message={message}/>
      </OpenSnackContext.Provider>
    </div>
  );
}
