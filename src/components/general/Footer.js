import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';
import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a" href="https://todarch.github.io/">
                    Tech Blog
                  </List.Item>
                  <List.Item as="a" href="mailto:info@todarch.com">
                    info@todarch.com
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Connect" />
                <List link inverted>
                  <List.Item as="a" href="https://github.com/todarch">
                    On Github
                  </List.Item>
                  <List.Item as="a" href="https://twitter.com/todarchapp">
                    On Twitter
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Todarch App
                </Header>
                <p>
                  Todarch is an open-source project. We are looking for
                  passinate developers to join our adventurous journey
                  developing the next best thing.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default Footer;
