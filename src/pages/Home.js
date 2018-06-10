import React from 'react';
import { UserContext } from '../context/UserContext';
import CurrentUserTodos from './td/CurrentUserTodos';
import Jumbotron from '../components/general/Jumbotron';

class Home extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {userContext => {
          return userContext.loggedIn ? <CurrentUserTodos /> : <Jumbotron />;
        }}
      </UserContext.Consumer>
    );
  }
}

export default Home;
