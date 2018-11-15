import { Component } from 'react';
import React from 'react';
import {
  Form,
  Container,
  Message,
  Button,
  Input,
  Dropdown
} from 'semantic-ui-react';
import { createTodo } from '../../util/tdApiCalls';
import { Redirect } from 'react-router-dom';
import routes from '../../util/routes';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import FieldHelperText from '../FieldHelperText';
import moment from 'moment';

const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, 'Title must be at least 8 characters.')
    .max(200, 'Title must be at most 200 characters.')
    .required('Title is required.'),
  duration: Yup.number().positive('Duration must be a positive number.')
});

const durationOptions = [
  { key: 'minutes', text: 'Minutes', value: 'minutes' },
  { key: 'hours', text: 'Hours', value: 'hours' },
  { key: 'days', text: 'Days', value: 'days' },
  { key: 'weeks', text: 'Weeks', value: 'weeks' },
  { key: 'months', text: 'Months', value: 'months' },
  { key: 'years', text: 'Years', value: 'years' }
];

class TodoForm extends Component {
  state = {
    redirect: false,
    newTodoId: -1,
    durationUnit: 'minutes'
  };

  handleUnit = (evet, data) => {
    this.setState({ durationUnit: data.value });
  };

  handleSubmit = (values, actions) => {
    const timeNeededInMin = moment
      .duration(values.duration, this.state.durationUnit)
      .asMinutes();
    const newTodoReq = {
      title: values.title,
      priority: values.priority,
      timeNeededInMin: timeNeededInMin,
      description: values.description
    };
    actions.setSubmitting(true);
    createTodo(newTodoReq)
      .then(json => {
        actions.setSubmitting(false);
        this.setState({ redirect: true, newTodoId: json.id });
      })
      .catch(err => {
        actions.setSubmitting(false);
        actions.setStatus({ errorMessage: err.errorMessage });
        console.log('err', err);
      });
  };

  render() {
    return this.state.redirect ? (
      <Redirect to={routes.todos + '/' + this.state.newTodoId} />
    ) : (
      <Container fluid style={{ width: 500 }}>
        <Formik
          initialValues={{
            title: '',
            description: '',
            priority: 5,
            duration: 0,
            durationUnit: 'minutes'
          }}
          validationSchema={TodoSchema}
          onSubmit={this.handleSubmit}
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
                <Message attached header="Create New Todo" />
                <Form
                  className="attached fluid segment"
                  loading={isSubmitting}
                  error={!isValid || !_.isEmpty(status)}
                >
                  {status && <Message error content={status.errorMessage} />}
                  <Form.Field required error={touched.title && errors.title}>
                    <label>Title</label>
                    <input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FieldHelperText
                      touched={touched.title}
                      error={errors.title}
                    />
                  </Form.Field>
                  <Form.Field error={touched.duration && errors.duration}>
                    <label>
                      How much time you will need to get this done
                      approximately?
                    </label>
                    <Input
                      label={
                        <Dropdown
                          name="durationUnit"
                          defaultValue="minutes"
                          options={durationOptions}
                          onChange={this.handleUnit}
                        />
                      }
                      labelPosition="right"
                      name="duration"
                      type="number"
                      min={0}
                      placeholder="0"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.duration}
                    />
                    <FieldHelperText
                      touched={touched.duration}
                      error={errors.duration}
                      info={'You may leave it as 0 if you are not sure.'}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label={`Priority: ${values.priority}`}
                      min={1}
                      max={10}
                      name="priority"
                      onChange={handleChange}
                      step={1}
                      type="range"
                      value={values.priority}
                    />
                    <FieldHelperText info={'1 is lowest, 10 is highest.'} />
                  </Form.Field>
                  <Form.Field>
                    <Form.TextArea
                      label="Describe"
                      placeholder="Describe the details, tips or hows in order to get it done easily..."
                      onChange={handleChange}
                      name="description"
                    />
                  </Form.Field>
                  <Button
                    fluid
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    type="submit"
                    onClick={handleSubmit}
                    content="Create"
                  />
                </Form>
              </React.Fragment>
            )
          }
        />
      </Container>
    );
  }
}

export default TodoForm;
