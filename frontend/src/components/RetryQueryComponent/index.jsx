import './index.css'
import React from 'react';

const RetryQueryComponent = React.memo(function RetryQueryComponent({message = "Error", refetch}){
    return ( 
        <div className="retry-query-component">
          {message}
          <button onClick = {refetch}>Reintentar</button>
        </div>
     );
})

export default RetryQueryComponent;