import React from 'react';
    
    function Loading() {
      return (
        <>
          <div className="absolute bottom-0 left-0 grid grid-cols-2 gap-4">
            <img src="Loading-bar.gif" />
            <strong className='my-6'>loding...</strong>
          </div>
        </>
      );
    }
    
export default Loading;