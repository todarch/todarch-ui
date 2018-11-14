import React from 'react';
import { Button, Form, Message, Icon, Segment } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import { register } from '../../util/umApiCalls';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import FieldHelperText from '../FieldHelperText';

const RegistrationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .max(50, 'Password must be at most 50 characters.')
    .required('Password is required.'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password', null)], 'Confirm password must match password.')
    .required('Confirm password is required.'),
  email: Yup.string()
    .email('Email address is invalid.')
    .required('Email address is required.')
});

class RegistrationForm extends React.Component {
  handleRegistration(values, actions) {
    register({ email: values.email, password: values.password })
      .then(json => {
        actions.setSubmitting(false);
        actions.setStatus({ registered: true });
        console.log('User created successfully');
      })
      .catch(err => {
        actions.setSubmitting(false);
        console.log('Something went wrong: ', err);
        actions.setStatus({
          showError: true,
          registered: false,
          errorMessage: err.errorMessage
        });
      });
  }

  render() {
    return (
      <Container fluid style={{ width: 500 }}>
        <Formik
          initialValues={{ email: '', password: '', passwordConfirm: '' }}
          validationSchema={RegistrationSchema}
          onSubmit={this.handleRegistration}
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
            status && status.registered ? (
              <ThankYou />
            ) : (
              <React.Fragment>
                <Message
                  attached
                  header="Welcome to Todarch!"
                  content="Fill out the form below to sign-up for a new account"
                />
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
                      info={
                        'Email address will be used for account activation.'
                      }
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
                      info={
                        'Password must be at least 8, at most 50 characters long.'
                      }
                    />
                  </Form.Field>
                  <Form.Field
                    required
                    error={touched.passwordConfirm && errors.passwordConfirm}
                  >
                    <label>Password Confirm</label>
                    <input
                      name="passwordConfirm"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.passwordConfirm}
                    />
                    <FieldHelperText
                      touched={touched.passwordConfirm}
                      error={errors.passwordConfirm}
                      info={'Please enter your password again.'}
                    />
                  </Form.Field>
                  <Button
                    fluid
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Form>
                <Message attached="bottom" warning>
                  <Icon name="help" />
                  Already have an account?&nbsp;<a href="/login">
                    Log in here.
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

export default RegistrationForm;

const ThankYou = () => (
  <Segment placeholder textAlign="center">
    <Icon name="check circle outline" color="green" size="massive" />
    <br />
    <br />
    <p>
      Thank you for registering! We have sent a link to your email. You may use
      it to activate your account.
    </p>
  </Segment>
);
