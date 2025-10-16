import {createContext, useState} from 'react';
import MySnackbar from './MySnackbar';

export const OpenSnackContext = createContext({});

export const OpenSnackProvider = ({children})=>{
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  function showSnackbar(message) {
    setOpen(true);
    setMessage(message);
  }
  return (
    <OpenSnackContext.Provider value={{showSnackbar}}>
      {children}
      <MySnackbar open={open} setOpen={setOpen} message={message} />
    </OpenSnackContext.Provider>
  );
}
