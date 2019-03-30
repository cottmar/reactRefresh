import React from 'react';

const withClass = (WrappedComponent, className) => {
  // return a functional component
  return props => (
    <div className={className}>
      <WrappedComponent {...props}/>
    </div>
  );
};

export default withClass;