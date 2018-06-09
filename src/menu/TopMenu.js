import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default class TopMenu extends Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {};
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <Link to={'/'}>Home</Link>
        </Menu.Item>

        <UserContext.Consumer>
          {userContext => {
            const { loggedIn } = userContext;
            return loggedIn ? (
              <React.Fragment>
                <Menu.Item
                  name="account"
                  active={activeItem === 'account'}
                  onClick={this.handleItemClick}
                >
                  <Link to={'/account'}>Account</Link>
                </Menu.Item>
                <Menu.Item
                  name="logout"
                  active={activeItem === 'logout'}
                  onClick={this.handleItemClick}
                >
                  <Link to={'/logout'}>Log out</Link>
                </Menu.Item>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Menu.Item
                  name="register"
                  active={activeItem === 'register'}
                  onClick={this.handleItemClick}
                >
                  <Link to={'/register'}>Register</Link>
                </Menu.Item>
                <Menu.Item
                  name="login"
                  active={activeItem === 'login'}
                  onClick={this.handleItemClick}
                >
                  <Link to={'/login'}>Login</Link>
                </Menu.Item>
              </React.Fragment>
            );
          }}
        </UserContext.Consumer>
      </Menu>
    );
  }
}
