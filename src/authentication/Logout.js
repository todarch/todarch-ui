import React from 'react';
import { Loader } from 'semantic-ui-react';
import { logout } from '../util/umApiCalls';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      done: false
    };
  }

  componentWillMount() {
    this.handleLogout();
  }

  handleLogout() {
    logout()
      .then(json => {
        console.log('User logout successfully');
        this.props.userContext.logOut();
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      });
    this.setState({ done: true });
  }

  render() {
    return this.state.done === true ? (
      <Redirect to={'/'} />
    ) : (
      <Loader active inline="centered" />
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {userContext => <Logout {...props} userContext={userContext} />}
  </UserContext.Consumer>
);
