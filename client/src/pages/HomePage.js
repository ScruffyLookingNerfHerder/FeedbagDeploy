import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import { withUser } from '../services/withUser';

class HomePage extends Component {
  state = {
    stuff: null
  }
  componentDidMount() {
    // only try loading stuff if the user is logged in.
    if (!this.props.user) {
      return;
    }
    console.log(this.props.user);


      axios.get('/api/Restaurants/' + this.props.user.id)
        .then(res => {
          console.log(res.data);
          this.setState({
            stuff: res.data.name
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            stuff:[]
          });
        });
  }
  render() {
    const { user } = this.props; // get the user prop from props
    const { stuff } = this.state; // get stuff from state

    return (
      <Fragment>
        {user && stuff &&
          <div>
            Welcome back, {user.username}!
          <List>
           {stuff.map((s, i) => <ListItem key={i} primaryText={s} />)}
          </List>
          </div>
        }
        {user && !stuff &&
          <div>Hold on, looking for your stuff...</div>
        }
        {!user &&
          <div>Hey! I don't recognize you! Register and log in using the link above</div>
        }

        <p>
          <Link to="/membersonly">
            Click here
          </Link> to go the members only area. If you are not logged in,
          it'll redirect you to the login page. <Link to="/search"> Click here </Link> to go to the search page and find Restaurants near you!
        </p>
      </Fragment>
    );
  }
}

// withUser function will wrap the specified component in another component that will
// inject the currently logged in user as a prop called "user"
export default withUser(HomePage);
