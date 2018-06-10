import { createContext } from 'react';
import React, { Component } from 'react';
import { isAlreadyAuthenticated } from '../util/umApiCalls';
import { Loader } from 'semantic-ui-react';

export const UserContext = createContext();

export class UserContextProvider extends Component {
  constructor(props) {
    super(props);

    this.logIn = () => {
      this.setState({ loggedIn: true });
    };

    this.logOut = () => {
      this.setState({ loggedIn: false });
    };

    this.state = {
      logIn: this.logIn,
      logOut: this.logOut,
      loggedIn: false,
      email: '',
      load: false
    };
  }

  componentWillMount() {
    console.log('provider component will mount');
    isAlreadyAuthenticated()
      .then(value => this.setState({ loggedIn: value, load: true }))
      .catch(err => this.setState({ loggedIn: false, load: true }));
  }

  render() {
    return this.state.load ? (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    ) : (
      <Loader active={!this.state.load} size="large">
        Loading...
      </Loader>
    );
  }
}
