import {createContext} from 'react';
import React, { Component } from 'react'
import {isAlreadyAuthenticated} from '../util/umApiCalls';


export const UserContext = createContext();

export class UserContextProvider extends Component {
  constructor(props) {
    super(props);

    this.logIn = () => {
      this.setState({loggedIn: true})
    };

    this.logOut = () => {
      this.setState({loggedIn: false})
    };

    this.state = {
      logIn: this.logIn,
      logOut: this.logOut,
      loggedIn: false,
      email: '',
    };
  }

  componentWillMount() {
    console.log("provider component will mount");
    isAlreadyAuthenticated()
      .then(value => this.setState({loggedIn: value}))
      .catch(err => this.setState({loggedIn: false}));
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

