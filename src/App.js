import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './components/um/RegistrationForm';
import AuthenticationForm from './components/um/AuthenticationForm';
import Account from './account/Account';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Logout from './authentication/Logout';
import routes from './util/routes';
import NewTodo from './pages/td/NewTodo';
import ShowTodo from './pages/td/ShowTodo';
import Home from './pages/Home';
import { Container } from 'semantic-ui-react';
import Footer from './components/general/Footer';
import FixedMenu from './components/general/FixedMenu';

/**
 * react-router contains all the common components between react-router-dom and react-router-native.
 * If you're on the web then react-router-dom should have everything
 * If you're using React Native, react-router-native should have everything you need for the same reason.
 * So you'll probably never have to import anything directly from react-router.
 * <Router history={browserHistory}> vs <Router>
 * In RRv4 you won't need to pass down browserHistory, that was just for previous versions of the router.
 */

console.log(process.env.REACT_APP_API_ENDPOINT);

class App extends Component {
  // path are matches based on regex, /about also matches / path, use exact
  render() {
    return (
      <UserContextProvider>
        <Router>
          <React.Fragment>
            <FixedMenu />
            <DashboardRoute exact path={routes.home} component={Home} />
            <DashboardRoute
              exact
              path={routes.register}
              component={RegistrationForm}
            />
            <DashboardRoute
              exact
              path={routes.login}
              component={AuthenticationForm}
            />
            <DashboardRoute exact path={routes.account} component={Account} />
            <DashboardRoute exact path={routes.newTodo} component={NewTodo} />
            <DashboardRoute
              exact
              path={'/todos/:todoId'}
              component={ShowTodo}
            />
            <Route exact path={routes.logout} component={Logout} />
            <Footer />
          </React.Fragment>
        </Router>
      </UserContextProvider>
    );
  }
}

export default App;

const DashboardLayout = ({ children, ...rest }) => {
  return (
    <Container style={{ minHeight: 600, padding: '1em 0em' }}>
      {children}
    </Container>
  );
};

const DashboardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <DashboardLayout>
          <Component {...matchProps} />
        </DashboardLayout>
      )}
    />
  );
};
