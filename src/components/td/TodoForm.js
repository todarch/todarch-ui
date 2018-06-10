import { Component } from 'react';
import React from 'react';
import { Form, Container } from 'semantic-ui-react';
import { createTodo } from '../../util/tdApiCalls';
import { Redirect } from 'react-router-dom';
import routes from '../../util/routes';

const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(priority => ({
  key: priority,
  text: priority,
  value: priority
}));

class TodoForm extends Component {
  state = {
    redirect: false,
    newTodoId: -1,
    title: '',
    description: '',
    priority: ''
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const newTodoReq = this.state;
    createTodo(newTodoReq)
      .then(json => this.setState({ redirect: true, newTodoId: json.id }))
      .catch(err => console.log('err', err));
  };

  render() {
    return this.state.redirect ? (
      <Redirect to={routes.todos + '/' + this.state.newTodoId} />
    ) : (
      <Container fluid style={{ width: 500 }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label={'Title'}
            placeholder="Title"
            onChange={this.handleChange}
            name="title"
          />
          <Form.TextArea
            label="Describe"
            placeholder="Describe..."
            onChange={this.handleChange}
            name="description"
          />
          <Form.Select
            label="Priority"
            options={priorities}
            placeholder="Priority"
            onChange={this.handleChange}
            name="priority"
          />
          <Form.Button content={'Create'} />
        </Form>
      </Container>
    );
  }
}

export default TodoForm;
