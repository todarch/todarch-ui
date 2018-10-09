import { Component } from 'react';
import { Card, List } from 'semantic-ui-react';
import React from 'react';

class TodoDetail extends Component {
  render() {
    return Object.getOwnPropertyNames(this.props.todo).length === 0 ? (
      <p>Requested resource not found</p>
    ) : (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.todo.title}</Card.Header>
          <Card.Meta>
            <List>
              <List.Item>Priority: {this.props.todo.priority}</List.Item>
              <List.Item>
                Time Needed (mins): {this.props.todo.timeNeededInMin}
              </List.Item>
            </List>
          </Card.Meta>
          <Card.Description>{this.props.todo.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default TodoDetail;
