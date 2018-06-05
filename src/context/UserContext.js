import {createContext} from 'react';
import React, { Component } from 'react'


export const UserContext = createContext();

export class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.logIn = () => {
      this.setState({loggedIn: true})
    };
    this.state = {
      logIn: this.logIn,
      logOut: () => {},
      loggedIn: false,
      email: '',
    };
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

