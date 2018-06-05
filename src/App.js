import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './registration/RegistrationForm';
import AuthenticationForm from './authentication/AuthenticationForm';
import Account from './account/Account';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import TopMenu from './menu/TopMenu';
import {UserContextProvider} from './context/UserContext'

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
          <div>
            <TopMenu/>
            <Route exact  path={'/'} component={Account}/>
            <Route exact  path={'/register'} component={RegistrationForm}/>
            <Route exact  path={'/login'} component={AuthenticationForm}/>
            <Route exact  path={'/account'} component={Account}/>
          </div>
        </Router>
      </UserContextProvider>
    )
  }
}

export default App;
