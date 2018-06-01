import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./App.css"
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import { withUser, update } from './services/withUser';

import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthFailedPage from './pages/AuthFailedPage';
import TestSpotifyPage from './pages/TestSpotifyPage';
import TestTwitterPage from './pages/TestTwitterPage';
import MembersOnlyPage from './pages/MembersOnlyPage';
import SearchPage from './pages/SearchPage';
import UserPage from './pages/Userpage';
import RecipesPage from './pages/RecipesPage';
import RestaurantsPage from './pages/RestaurantsPage';
import GroceriesPage from './pages/Groceries';
import GroceryPage from './pages/Grocery'
import RecipePage from './pages/RecipePage';
import RestaurantPage from './pages/RestaurantPage';

class App extends Component {
  componentDidMount() {
    // this is going to double check that the user is still actually logged in
    // if the app is reloaded. it's possible that we still have a user in sessionStorage
    // but the user's session cookie expired.
    axios.get('/api/auth')
      .then(res => {
        // if we get here, the user's session is still good. we'll update the user
        // to make sure we're using the most recent values just in case
        update(res.data);
      })
      .catch(err => {
        // if we get a 401 response, that means the user is no longer logged in
        if (err.response.status === 401) {
          update(null);
        }
      });
  }
  render() {
    const { user } = this.props;
    return (
      <Router>
        <MuiThemeProvider>
          <Fragment>
            <Navbar
              user={user}
            />
            <Switch>

              <Route exact path="/" component={LoginPage} />
              <Route exact path="/create" component={CreateAccountPage} />
              <Route exact path="/auth/failed" component={AuthFailedPage} />
              <Route exact path="/testspotify" component={TestSpotifyPage} />
              <Route exact path="/testtwitter" component={TestTwitterPage} />
              <ProtectedRoute exact path="/membersonly" component={MembersOnlyPage} />
              <ProtectedRoute exact path="/search" component={SearchPage} />
              <ProtectedRoute exact path="/user" component={UserPage} />
              <ProtectedRoute exact path="/recipes" component={RecipesPage} />
              <ProtectedRoute exact path="/restaurants" component={RestaurantsPage} />
              <ProtectedRoute exact path="/groceries" component={GroceriesPage} />
              <ProtectedRoute exact path="/groceries/:userid/:id" component={GroceryPage} />
              <ProtectedRoute exact path="/recipes/:userid/:id" component={RecipePage} />
              <ProtectedRoute exact path="/restaurants/:userid/:id" component={RestaurantPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withUser(App);
