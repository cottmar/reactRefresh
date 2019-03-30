import React, { useEffect } from 'react';
import classes from './Cockpit.css';


const cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // http request...
    // want to control when it executes
    setTimeout(() => {
        // alert('Saved data to cloud!');
    }, 1000);
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect')
    }
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    };
  });


  const assignedClasses = [];

  let btnClass = ' ';
  // btnClass = classes.Red

  if (props.showPersons) {
        // let classes = ['red', 'bold'].join(' ');
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push( classes.red ); // classes = ['red];
  }
  if (props.personsLength <= 1) {
    assignedClasses.push( classes.bold ); // classes = ['red', 'bold'];
  }

  return (
    <div className={classes.Cockpit}>
      <h1>
        {props.title}
      </h1>
      <p className={assignedClasses.join(' ')}>this is really working</p>
      <button
        className={btnClass}
        onClick={props.clicked}>Toggle Persons
      </button> 
  </div>
  );
}

export default React.memo(cockpit);