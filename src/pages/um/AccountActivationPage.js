import React, { Component } from 'react';
import { parse } from 'query-string';
import { activateAccount } from '../../util/umApiCalls';
import { Container, Icon, Loader } from 'semantic-ui-react';

export default class AccountActivationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activated: false
    };
  }

  componentDidMount() {
    const parsed = parse(this.props.location.search);
    const activationCode = parsed.code;
    if (activationCode) {
      this.setState({ loading: true });
      activateAccount(activationCode)
        .then(result => {
          this.setState({ loading: false, activated: true });
          console.log('activated successfully');
        })
        .catch(error => {
          this.setState({ loading: false, activated: false });
          console.log('something happened:', error);
        });
    }
  }

  render() {
    const { loading, activated } = this.state;

    return (
      <Container fluid style={{ width: 500 }}>
        {loading ? (
          <Loader active inline="centered" />
        ) : (
          <React.Fragment>
            <Icon
              size="massive"
              color={activated ? 'green' : 'red'}
              name={activated ? 'checkmark' : 'close'}
            />
            <p>
              {activated
                ? 'Your account has been successfully activated. Now you can log in.'
                : 'Invalid activation code.'}
            </p>
          </React.Fragment>
        )}
      </Container>
    );
  }
}
