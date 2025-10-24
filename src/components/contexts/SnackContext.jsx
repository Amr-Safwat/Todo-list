import {createContext, useState} from 'react';
import MySnackbar from '../MySnackbar';

 const OpenSnackContext = createContext({});

 const OpenSnackProvider = ({children})=>{
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

export {OpenSnackContext, OpenSnackProvider};
