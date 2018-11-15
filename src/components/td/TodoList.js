import { Component } from 'react';
import {
  Button,
  Icon,
  Confirm,
  Item,
  Label,
  Transition
} from 'semantic-ui-react';
import React from 'react';
import moment from 'moment';
import { deleteTodoById } from '../../util/tdApiCalls';

class TodoList extends Component {
  render() {
    const { todos } = this.props;
    return Object.getOwnPropertyNames(todos).length === 0 ? (
      <p>Requested resource not found</p>
    ) : (
      <Item.Group divided>
        {todos.map(td => <TodoItem key={td.id} td={td} />)}
      </Item.Group>
    );
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      markingAsDone: false,
      deleted: false,
      deleting: false,
      deletionModalOpen: false
    };
  }

  handleCancel = () => {
    this.setState({ deletionModalOpen: false });
  };

  confirmDeletion = () => {
    this.setState({ deletionModalOpen: true });
  };

  handleDeletion = () => {
    this.handleCancel();
    const todoId = this.props.td.id;
    this.setState({ deleting: true });
    deleteTodoById(todoId)
      .then(response => {
        this.setState({ deleted: true, deleting: false });
      })
      .catch(err => {
        this.setState({ deleting: false });
        console.log('something happened: ', err);
      });
  };

  markAsDone = () => {
    const todoId = this.props.td.id;
    this.setState({ markingAsDone: true });
    deleteTodoById(todoId)
      .then(response => {
        this.setState({ done: true, markingAsDone: false });
      })
      .catch(err => {
        this.setState({ done: false });
        console.log('something happened: ', err);
      });
  };

  render() {
    if (this.state.deleted) {
      return null;
    }
    const { td } = this.props;
    return (
      <Transition
        unmountOnHide={true} // remove it from DOM
        visible={!(this.state.deleted || this.state.done)}
        animation="fade"
        duration={1000}
      >
        <Item>
          <Item.Content>
            <Icon size="tiny" color="blue" name="check" />
            <Item.Header as="a">{td.title}</Item.Header>
            <Item.Meta>
              <span title={moment(td.createdAtEpoch).calendar()}>
                {moment(td.createdAtEpoch).fromNow()}
              </span>
            </Item.Meta>
            <Item.Description>{td.description}</Item.Description>
            <Item.Extra>
              <Button
                compact
                loading={this.state.markingAsDone}
                size="mini"
                icon="check"
                content="Mark as Done"
                onClick={this.markAsDone}
              />
              <Button
                compact
                loading={this.state.deleting}
                size="mini"
                icon="remove"
                content="Delete"
                onClick={this.confirmDeletion}
              />
              {/* {td.status === 'INITIAL' && <Label icon='check' content='Mark as Done' />}
          {td.status === 'DONE' && <Label icon='check' content='Done' />} */}
              <Label
                icon={getPriorityIcon(td.priority)}
                content={td.priority}
              />
              <Label
                icon="hourglass half"
                content={moment
                  .duration(td.timeNeededInMin, 'minute')
                  .humanize()}
              />
            </Item.Extra>
          </Item.Content>
          <Confirm
            open={this.state.deletionModalOpen}
            header={`Deleting '${td.title}'`}
            content={
              'This action can not be undone. Are you sure that you want to do this?'
            }
            cancelButton="Hell, no"
            confirmButton="Yes, you do this"
            onCancel={this.handleCancel}
            onConfirm={this.handleDeletion}
          />
        </Item>
      </Transition>
    );
  }
}

export default TodoList;

const getPriorityIcon = priority => {
  if (priority < 4) {
    // 1, 2, 3
    return 'thermometer empty';
  } else if (priority < 6) {
    // 4, 5
    return 'thermometer half';
  } else if (priority < 8) {
    // 6, 7
    return 'thermometer three quarters';
  } else {
    // 8, 9 , 10
    return 'thermometer full';
  }
};
