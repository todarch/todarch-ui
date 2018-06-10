import { Component } from 'react';
import React from 'react';
import { getTodoById } from '../../util/tdApiCalls';
import TodoDetail from '../../components/td/TodoDetail';
import { Loader } from 'semantic-ui-react';

class ShowTodo extends Component {
  state = {
    todo: {},
    done: false
  };

  componentWillMount() {
    // comes from react router url param
    const { todoId } = this.props.match.params;
    getTodoById(todoId)
      .then(json => {
        this.setState({ todo: json });
        this.setState({ done: true });
      })
      .catch(err => {
        console.log('An error occurred: ', err);
        this.setState({ done: true });
      });
  }

  render() {
    return this.state.done ? (
      <TodoDetail todo={this.state.todo} />
    ) : (
      <Loader active={!this.state.done} />
    );
  }
}

export default ShowTodo;
