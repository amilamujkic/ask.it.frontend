import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Import components

import navbar from './components/navbar';

//Import pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

const theme = createMuiTheme(themeObject);


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/ask/:askId"
                component={user}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
    );
  }
}

export default App;
