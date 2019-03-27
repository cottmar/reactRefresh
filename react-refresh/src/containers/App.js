import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'unique', name: 'Birdie', age: 5},
      { id: 'younique', name: 'Billie Jean', age: 7},
      { id: 'yonique', name: 'Cara', age: 30}

    ],
    otherState: 'some other value',
    showPersons: false
  }

  // becuse the default state is not set to show persons on load -- showpersons: false, the togglepersonhandler is going to show the persons on click
  togglePersonsHandler =() => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  nameChangedHandler = (event, id) => {
    // p is person but we can't resuse the name
    // if the id that is passed in matches, return the id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons } )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {

    let persons = null;
    let btnClass = ' ';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
               name={person.name}
               age={person.age}
               key={person.id}
               changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      btnClass = classes.Red
    }
    // 'red bold'
    // let classes = ['red', 'bold'].join(' ');
    
    let assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push( classes.red); // classes = ['red];
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push( classes.bold); // classes = ['red', 'bold'];
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a react app.</h1>
        <p className={assignedClasses.join(' ')}>this is really working</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons
        </button> 
        {/* // reference to either render nothing or persons */}
        {persons}
      </div>
    );
  }
}

export default App;
