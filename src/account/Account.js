import React from 'react'
import {Card, Dimmer, Icon, Image, Loader} from 'semantic-ui-react'
import {Container} from 'semantic-ui-react'
import {currentUser} from '../util/umApiCalls';
import {Redirect} from 'react-router-dom';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.loadAccount = this.loadAccount.bind(this);

    this.state = {
      email: '',
      apiCalling: false,
      loaded: false,
      redirect: false
    }
  }

  componentDidMount() {
    console.log("In componentDidMount");
    this.loadAccount();
  }

  loadAccount() {
    this.setState({apiCalling: true});
    currentUser()
      .then(response => this.handleApiResponse(response), err => this.handleApiError(err));
    this.setState({apiCalling: false});
  }

  handleApiResponse(response) {
    if (response.ok) {
      console.log("User info fetched successfully");
      this.setState({loaded: true});
      // response.json().then(res => console.log(res.email));
      response.json().then(res => this.setState({email: res.email}));
      // let jsonResponse = response.json().then(res => JSON.parse(res));
      // console.log(jsonResponse);
      // this.setState({email: jsonResponse.email})
    } else {
      console.log("unexpected: ", response.statusText);
      this.setState({redirect: true});
    }
  }

  handleApiError(err) {
    console.log("Something went wrong: ", err.message);
    this.setState({redirect: true});
  }

  render() {
    if ( this.state.redirect ) {
      return <Redirect to={'/login'} />
    }
    return(
      <Container fluid
                 style={{width: 500}}
      >
        {this.state.loaded ?
            <Card>
              <Image src='/assets/images/avatar/large/matthew.png' />
              <Card.Content>
                <Card.Header>{this.state.email}</Card.Header>
                <Card.Meta>
                  <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  22 Friends
                </a>
              </Card.Content>
            </Card>
          :
          <p>Showing loader</p>
        }
      </Container>
    );

  }

}

export default Account;
// {/*<Dimmer active>*/}
// {/*<Loader content='Loading' />*/}
// {/*</Dimmer>*/}
