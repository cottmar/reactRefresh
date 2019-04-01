import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import classes from './Person.css';
import withClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

// Fragment works the same as the Aux component -- gets rid of needing a div

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
// static means it can be accessed from outside without the need to instantiate a class first
// this allows react to connect to your context behind the scenes and gives you a new context property  
static contextType = AuthContext;

  componentDidMount() {
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }

  // componentDidMount() {
  //   this.inputElement.focus();
  // }

  render() {
    console.log('[Person.js] rendering...');

    return (
    <Aux> 
    {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
    <p onClick={this.props.click}>
      I'm {this.props.name} and I am {this.props.age} years old
    </p>
    <p key="i2">{this.props.children}</p>
    <input
      key="i3"
      // ref={(inputEl) => {this.inputElement = inputEl}}
      ref={this.inputElementRef}
      type="text" 
      onChange={this.props.changed} 
      value={this.props.name}
    />
    </Aux>
    );
  }
}
// react will look out for this and make sure data is passed in correctly
Person.propTypes = {
  // for a click, i expect a pointer at a function
  click: PropTypes.func,
  //expects a string
  name: PropTypes.string,
  // expects a number, esp important in calculations
  age: PropTypes.number,
  // expects to point to a function
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);