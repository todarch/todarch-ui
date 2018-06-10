import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import routes from '../../util/routes';
import { UserContext } from '../../context/UserContext';

class FixedMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {};
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="large">
        <Container>
          <Menu.Item
            as="div" // <a> cannot appear as a descendant of <a>
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Link to={routes.home}>Home</Link>
          </Menu.Item>

          <Menu.Menu position="right">
            <UserContext.Consumer>
              {userContext => {
                const { loggedIn } = userContext;
                return loggedIn ? (
                  <React.Fragment>
                    <Menu.Item
                      as="div"
                      name="account"
                      active={activeItem === 'account'}
                      onClick={this.handleItemClick}
                    >
                      <Link to={'/account'}>Account</Link>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      name="new-todo"
                      active={activeItem === 'new-todo'}
                      onClick={this.handleItemClick}
                    >
                      <Link to={routes.newTodo}>New Todo</Link>
                    </Menu.Item>
                    <Menu.Item className="item">
                      <Link to={routes.logout}>
                        <Button>Log out</Button>
                      </Link>
                    </Menu.Item>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Menu.Item className="item">
                      <Link to={routes.login}>
                        <Button>Log in</Button>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to={'/register'}>
                        <Button primary>Register</Button>
                      </Link>
                    </Menu.Item>
                  </React.Fragment>
                );
              }}
            </UserContext.Consumer>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default FixedMenu;
