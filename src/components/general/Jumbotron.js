import React from 'react';
import { Button, Container, Header, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import routes from '../../util/routes';

class Jumbotron extends React.Component {
  render() {
    return (
      <Container text>
        <Header
          as="h2"
          content="Yet another todo application said no one."
          style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />
        <Header
          as="h1"
          content="Welcome to Todarch Application"
          style={{
            fontSize: '3em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '1em'
          }}
        />
        <List>
          <List.Item>
            <List.Icon name="plus" />
            <List.Content>
              <List.Header>Have flexible deadlines</List.Header>
              <List.Description>
                Todo items do not have to have deadline
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="calendar" />
            <List.Content>
              <List.Header>Create daily todo lists</List.Header>
              <List.Description>
                You can plan your day ahead by picking the most important ones
                from all.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="trophy" />
            <List.Content>
              <List.Header>Keep track of your progress</List.Header>
              <List.Description>
                See what you have achieved in the past.
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
        <Link to={routes.register}>
          <Button primary size="huge">
            Get Started
            <Icon name="right arrow" />
          </Button>
        </Link>
      </Container>
    );
  }
}

export default Jumbotron;
