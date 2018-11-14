import React from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import { authenticate } from '../../util/umApiCalls';
import { UserContext } from '../../context/UserContext';
import { Redirect } from 'react-router-dom';
import routes from '../../util/routes';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import FieldHelperText from '../FieldHelperText';

const AuthenticationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required.'),
  email: Yup.string()
    .email('Email address is invalid.')
    .required('Email address is required.')
});

class AuthenticationForm extends React.Component {
  handleAuthentication = (values, actions) => {
    const authReq = {
      email: values.email,
      password: values.password
    };
    authenticate(authReq)
      .then(json => {
        actions.setSubmitting(false);
        console.log('User authenticated successfully');
        this.props.userContext.logIn();
        actions.setStatus({ redirect: true });
      })
      .catch(err => {
        actions.setSubmitting(false);
        console.log('Something went wrong: ', err.message);
        actions.setStatus({
          redirect: false,
          errorMessage: 'Incorrect credentials.'
        });
      });
  };

  render() {
    return (
      <Container fluid style={{ width: 500 }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={AuthenticationSchema}
          onSubmit={this.handleAuthentication}
          render={({
            values,
            status,
            errors,
            isValid,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting
          }) =>
            status && status.redirect ? (
              <Redirect to={routes.redirectionAfterLogin} />
            ) : (
              <React.Fragment>
                <Message attached header="Sign in to Todarch!" />
                <Form
                  className="attached fluid segment"
                  loading={isSubmitting}
                  error={!isValid || !_.isEmpty(status)}
                >
                  {status && <Message error content={status.errorMessage} />}
                  <Form.Field required error={touched.email && errors.email}>
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="joe@schmoe.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FieldHelperText
                      touched={touched.email}
                      error={errors.email}
                    />
                  </Form.Field>
                  <Form.Field
                    required
                    error={touched.password && errors.password}
                  >
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <FieldHelperText
                      touched={touched.password}
                      error={errors.password}
                    />
                  </Form.Field>
                  <Button
                    fluid
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Log In
                  </Button>
                </Form>
                <Message attached="bottom" warning>
                  <Icon name="help" />
                  New to Todarch?&nbsp;<a href="/register">
                    Create an account.
                  </a>
                </Message>
              </React.Fragment>
            )
          }
        />
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
