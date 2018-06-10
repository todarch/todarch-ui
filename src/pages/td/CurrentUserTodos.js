import React from 'react';
import TodoList from '../../components/td/TodoList';
import { getCurrentUserTodos } from '../../util/tdApiCalls';
import { Loader } from 'semantic-ui-react';

class CurrentUserTodos extends React.Component {
  state = {
    todos: [],
    done: false
  };

  componentWillMount() {
    getCurrentUserTodos()
      .then(json => this.setState({ todos: json, done: true }))
      .catch(err => {
        console.log('an error occurred ', err);
        this.setState({ done: true });
      });
  }
  render() {
    return this.state.done ? (
      //TODO:selimssevgi: wrap
      <TodoList todos={this.state.todos} />
    ) : (
      <Loader active={!this.state.done} inline />
    );
  }
}

export default CurrentUserTodos;
