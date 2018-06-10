import { Component } from 'react';
import { Icon, Table } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../util/routes';

class TodoList extends Component {
  render() {
    const { todos } = this.props;
    return Object.getOwnPropertyNames(todos).length === 0 ? (
      <p>Requested resource not found</p>
    ) : (
      <React.Fragment>
        <p>There are {todos.length} todos.</p>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <TodoRows todos={todos} />
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

const TodoRow = ({ td }) => {
  return (
    <React.Fragment>
      <Table.Cell>{td.title}</Table.Cell>
      <Table.Cell>{td.priority}</Table.Cell>
      <Table.Cell>
        <Link to={routes.todos + '/' + td.id}>
          <Icon name="content" />
        </Link>
      </Table.Cell>
    </React.Fragment>
  );
};

const TodoRows = ({ todos }) => {
  return todos.map(td => (
    <Table.Row key={td.id}>
      <TodoRow td={td} />
    </Table.Row>
  ));
};

export default TodoList;
