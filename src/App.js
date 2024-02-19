import './App.css';
import Header from './Header';
import Button from './Button';
import { useState } from 'react';
import Excell from './Excell';
import GeneralReport from './report/GeneralReport';
import UserContextProvider from './context/UserContext';

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="App container p-8 mx-auto xl:px-0 ">
      <UserContextProvider>
        <Header/>      
        <GeneralReport/>
        <Button count={count} onClick={handleClick}/>
        <Excell/>
      </UserContextProvider>
    </div>
  );
}

export default App;
