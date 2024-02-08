import React, { useState } from 'react';

function Button() {
    const [count, setCount] = useState(0);
  
    function handleClick() {
      setCount(count + 1);
    }
  
    return (
      <>
           <button className='bg-cyan-500 p-3 flex items-center text-3xl font-bold rounded-full' onClick={handleClick}>
            Clicked {count} times</button>
      </>
    );
  }

export default Button;