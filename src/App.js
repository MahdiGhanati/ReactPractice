import './App.css';
import Header from './Header';
import Button from './Button';
import { useState } from 'react';
import Person from './Person';
import Excell from './Excell';
import Notify from './Notify';

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <Header/>
      <Notify/>
      <Button count={count} onClick={handleClick}/>
      <Excell/>
    </div>
  );
}

export default App;
