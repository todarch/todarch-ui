import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import {register} from '../util/umApiCalls';
import {Redirect} from 'react-router-dom';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      apiCalling: false,
      redirect: false
    }
  }

  handleRegister() {
    console.log("Click on register!");
    //TODO:selimssevgi: validate input
    const registrationReq = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState({apiCalling: true});
    register(registrationReq)
      .then(response => this.handleApiResponse(response), err => this.handleApiError(err));
    this.setState({apiCalling: false});
  }

  /**
   * Note that the promise won't be rejected in case of HTTP 4xx or 5xx server responses.
   * The promise will be resolved just as it would be for HTTP 2xx.
   * Inspect the response.status number within the resolved callback to add conditional handling of server errors to your code.
   */
  handleApiResponse(response) {
    if (response.ok) {
      console.log("User created successfully");
      this.setState({redirect: true})
    } else {
      console.log("unexpected: ", response.statusText);
    }
  }

  handleApiError(err) {
    console.log("Something went wrong: ", err.message);
  }

  render() {
    return (
      this.state.redirect === true ?
        <Redirect to={'/login'} />
          :
      <Container fluid
                 style={{width: 500}}
      >
        <Form loading={this.state.apiCalling}>
          <Form.Field>
            <label>Email</label>
            <input placeholder='joe@schmoe.com' onChange={(e) => this.setState({email: e.target.value})} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type='password' onChange={(e) => this.setState({password: e.target.value})} />
          </Form.Field>
          <Form.Field>
            <label>Password Confirm</label>
            <input type='password' onChange={(e) => this.setState({passwordConfirm: e.target.value})} />
          </Form.Field>
          <Button type='submit' onClick={this.handleRegister}>Register</Button>
        </Form>
      </Container>
    );
  }

}

export default RegistrationForm;