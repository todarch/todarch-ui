import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import {register} from '../util/umApiCalls';
import {Redirect} from 'react-router-dom';
import * as status from 'http-status';

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
      .then(json => {
        console.log("User created successfully");
        this.setState({redirect: true})
      })
      .catch(err => {
        console.log("Something went wrong: ", err.message);
      });
    this.setState({apiCalling: false});
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