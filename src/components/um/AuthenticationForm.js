import React from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import { authenticate } from '../../util/umApiCalls';
import { UserContext } from '../../context/UserContext';
import { Redirect } from 'react-router-dom';
import routes from '../../util/routes';

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthentication = this.handleAuthentication.bind(this);

    this.state = {
      email: '',
      password: '',
      apiCalling: false,
      redirect: false
    };
  }

  handleAuthentication() {
    console.log('Click on login!');
    //TODO:selimssevgi: validate input
    const authReq = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState({ apiCalling: true });
    authenticate(authReq)
      .then(json => {
        console.log('User authenticated successfully');
        this.props.userContext.logIn();
        this.setState({ redirect: true, apiCalling: false });
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
        this.setState({ apiCalling: false });
      });
  }

  render() {
    return this.state.redirect ? (
      <Redirect to={routes.redirectionAfterLogin} />
    ) : (
      <Container fluid style={{ width: 500 }}>
        <Header as={'h1'}>Log in</Header>
        <Form loading={this.state.apiCalling}>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="joe@schmoe.com"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Form.Field>
          <Button type="submit" onClick={this.handleAuthentication}>
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

// https://reactjs.org/docs/context.html#accessing-context-in-lifecycle-methods
export default props => (
  <UserContext.Consumer>
    {userContext => <AuthenticationForm {...props} userContext={userContext} />}
  </UserContext.Consumer>
);
