import React, { Component } from 'react';
import classes from './App.css';
// import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }
  state = {
    persons: [
      { id: 'unique', name: 'Birdie', age: 5},
      { id: 'younique', name: 'Billie Jean', age: 7},
      { id: 'yonique', name: 'Cara', age: 30}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
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

    // becuse the default state is not set to show persons on load -- showpersons: false, the togglepersonhandler is going to show the persons on click
    togglePersonsHandler =() => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
    }

    loginHandler = () => {
      this.setState({authenticated: true});
    }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
      <Persons
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
      />
      );
    }

    return (
      <Aux classes={classes.App}>
      <button onClick={() => {
        this.setState({ showCockpit: false });
      }}
      >Remove Cockpit</button>
      <AuthContext.Provider 
      value={{
        authenticated: this.state.authenticated,
        login: this.loginHandler
        }}
      >
      {this.state.showCockpit ? (
        <Cockpit 
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}/>
      ) : null}
          {/* // reference to either render nothing or persons */}
          {persons}
        </AuthContext.Provider>
        </Aux>
      );
    }
  }

export default withClass(App, classes.App);
