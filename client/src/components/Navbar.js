import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';



import LoginButton from './LoginButton';
import LoginMenu from './LoginMenu';

import { update } from '../services/withUser';

const Navbar = (props) => {
  const { user } = props;
  const handleLogIn = () => {
    props.history.push('/');
  };
  const handleLogOut = () => {
    axios.delete('/api/auth')
      .then(() => {
        // unsets the currently logged in user. all components wrapped in withUser
        // will be updated with a null user and rerender accordingly
        update(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleTitleClick = () => {
    props.history.push('/');
  }
  return (
    <AppBar className = "Loginbar"
      title="Feedbag"
      showMenuIconButton={false}
      iconElementRight={user ?
        <LoginMenu user={user} onLogOut={handleLogOut} />
        : <LoginButton onClick={handleLogIn} />}
      onTitleClick={handleTitleClick}
    />
  )
};

export default withRouter(Navbar);
